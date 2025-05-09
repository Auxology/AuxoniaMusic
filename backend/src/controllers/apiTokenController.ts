import {Request, Response} from 'express';
import {sqlGenerateApiToken} from "../sql/token";

export async function generateApiToken(req:Request, res:Response):Promise<void>{
    try {
        //@ts-ignore
        // TODO: Fix This Type
        const user = req.user;

        if(!user) {
            res.status(401).json({message: "Unauthorized"});
            return;
        }

        const sqlResult:boolean | string = await sqlGenerateApiToken(user.id);

        if(!sqlResult) {
            // Already exists or server error
            res.status(409).json({message: "Api Token Already Exists"});
            return;
        }

        if(typeof sqlResult === "string") {
            res.status(500).json({message: sqlResult});
        }

        res.status(200).json({message: "Api Token Generated"});
    }
    catch (e) {
        console.error(e);
        res.status(500).json({message: "Internal Server Error"});
    }
}