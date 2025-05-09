from fastapi import FastAPI
from pydantic import BaseModel
import ollama

app = FastAPI()

class Prompt(BaseModel):
    prompt: str


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/api/llm/generate-playlist")
async def generate_playlist(prompt: Prompt):
    response = ollama.chat(model="gemma3:4b", messages=[{"role": "user", "content": prompt.prompt}])  # Access prompt.prompt

    print(response)

    return response