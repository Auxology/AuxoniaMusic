import { Request, Response } from 'express';
import axios from "axios";


export async function generatePlaylist(req:Request, res:Response):Promise<void> {
    try {
        const {prompt} = req.body;

        if (!prompt) {
            res.status(400).json({message: "Prompt is required"});
            return;
        }

        console.log(prompt)

        // Call LLM API
        const response = await axios.post("http://localhost:8000/api/llm/generate-playlist", {prompt});

        console.log(response.data)

        res.status(200).json({message: "Playlist Generated"});
    }
    catch (e) {
        console.error(e);
        res.status(500).json({message: "Internal Server Error"});
    }
}