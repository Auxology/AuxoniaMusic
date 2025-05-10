import pprint

from dotenv import load_dotenv
from fastapi import FastAPI, Request, Response, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client
from supabase.lib.client_options import ClientOptions

import httpx
import ollama
import os
import json


load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")

lastfm_key = os.environ.get("LASTFM_API_KEY")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

supabase = create_client(
    url,
    key,
    options=ClientOptions(
        auto_refresh_token=False,
        persist_session=False,
    )
)

class Prompt(BaseModel):
    prompt: str

@app.post("/api/llm/generate-playlist")
async def generate_playlist(
        request:Request,
        response: Response,
        prompt: Prompt
):
    token = request.headers.get("x-api-token")
    provider_token = request.headers.get("x-provider-token")

    if not token:
        response.status_code = status.HTTP_401_UNAUTHORIZED
        return {"error": "Unauthorized"}

    if not provider_token:
        response.status_code = status.HTTP_401_UNAUTHORIZED
        return {"error": "Unauthorized"}

    # Check token validity in Supabase
    resp = (
        supabase
        .schema("public")
        .from_("api_tokens")
        .select("id")
        .eq("id", token)
        .execute()
    )

    if resp.data is None or len(resp.data) == 0:
        response.status_code = status.HTTP_401_UNAUTHORIZED
        return {"error": "Unauthorized"}

    ollama_response = ollama.chat(model="gemma3:4b", messages=[{"role": "user", "content":
                                                         "Based on the provided prompt, recommend one song and one title."
                                                         "The prompt may include a song title and artist name—use these when available."
                                                         "If you only know the artist but not the song, recommend a song based on the artist."
                                                         "If neither the artist nor song is known, be precise in stating that no recommendation is possible. "
                                                         "However, if you can make a recommendation based on just the artist name or song name, do so. "
                                                         "Users may specify the number of songs or playlist duration—in such cases, do not exceed their requested amount."
                                                         "For playlist duration requests, estimate the number of songs needed to meet the time requirement."
                                                         "Your response must be in precise JSON format, ready for the LAST.FM API. this the prompt:" + prompt.prompt}])


    pprint.pprint(ollama_response)

    content = ollama_response['message']['content']

    if '```json' in content:
        json_text = content.split('```json')[1].split('```')[0].strip()
    else:
        json_text = content

    song_data = json.loads(json_text)
    
    track = song_data.get("track")
    artist = song_data.get("artist")

    lastfm_url = (
        f"https://ws.audioscrobbler.com/2.0/"
        f"?method=track.getsimilar"
        f"&artist={artist}"
        f"&track={track}"
        f"&api_key={lastfm_key}"
        f"&format=json"
        f"&limit=10"
    )

    lastfm_res = httpx.get(lastfm_url).json()

    pprint.pprint(lastfm_res)


    if "error" in lastfm_res:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": lastfm_res["message"]}

    response.status_code = status.HTTP_200_OK
    return {
        "Playlist Generated"
    }
