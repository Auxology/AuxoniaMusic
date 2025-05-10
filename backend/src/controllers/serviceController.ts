import { Request, Response } from 'express';
import axios from "axios";
import {sqlGetApiToken} from "../sql/token";


export async function generatePlaylist(req:Request, res:Response):Promise<void> {
    try {
        // @ts-ignore
        const user = req.user;
        const providerToken = req.headers['x-provider-token'];
        const {prompt} = req.body;

        if(!providerToken) {
            res.status(401).json({message: "Unauthorized"});
            return;
        }

        if (!prompt) {
            res.status(400).json({message: "Prompt is required"});
            return;
        }

        if(!user) {
            res.status(401).json({message: "Unauthorized"});
            return;
        }

        // Get User token
        const api_token = await sqlGetApiToken(user.id);

        if (api_token.length === 0) {
            res.status(401).json({message: "Unauthorized"});
            return;
        }

        // Call LLM API
        const response = await axios.post("http://localhost:8000/api/llm/generate-playlist",
            {prompt},
            {
                headers: {
                    'x-api-token': api_token,
                    'x-provider-token': providerToken,
                }
            }
        );

        console.log(response.data);

        res.status(200).json({message: "Playlist Generated"});
    }
    catch (e) {
        console.error(e);
        res.status(500).json({message: "Internal Server Error"});
    }
}