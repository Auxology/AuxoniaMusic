import {Request, Response, NextFunction} from 'express';
import {supabaseAdmin} from "../utils/supabase"


export async function isAuthenticated(req:Request, res:Response, next:NextFunction):Promise<void> {
    // Expect access token in headers
    const authorization:string | undefined = req.headers.authorization;

    if (!authorization) {
        res.status(401).json({message: "Unauthorized"});
        return;
    }

    // Get rid of the "Bearer" prefix
    const token:string = authorization.split(" ")[1];

    if(!token) {
        res.status(401).json({message: "Unauthorized"});
        return;
    }


    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

    if (error) {
        res.status(401).json({message: "Unauthorized"});
        return;
    }

    if(!user) {
        res.status(401).json({message: "Unauthorized"});
    }


    // @ts-ignore
    req.user = user;
    next();
}
