import {Request, Response} from 'express';
import {User} from "@supabase/supabase-js";

export async function generateApiToken(req:Request, res:Response):Promise<void>{
    try {
        //@ts-ignore
        const user = req.user;

        if(!user) {
            res.status(401).json({message: "Unauthorized"});
            return;
        }

        console.log(user)

        res.status(200).json({message: "Api Token Generated"});
    }
    catch (e) {
        console.error(e);
        res.status(500).json({message: "Internal Server Error"});
    }
}