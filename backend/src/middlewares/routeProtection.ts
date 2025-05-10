import {Request, Response, NextFunction} from 'express';
import {supabase} from "../utils/supabase"


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


    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error) {
        res.status(401).json({message: "Unauthorized"});
        return;
    }

    if(!user) {
        res.status(401).json({message: "Unauthorized"});
    }


    // @ts-ignore
    // TODO:Fix This Type
    req.user = user;
    next();
}

export async function apiTokenProtection(req:Request, res:Response, next:NextFunction):Promise<void> {
    // @ts-ignore
    const user = req.user

    const {error} = await supabase.rpc('check_and_increment_usage', { in_user: user.id });

    if (error) {

        if (error.message === 'limit_exceeded') {
            res.status(429).json({ error: 'API usage limit exceeded' });
            return;
        }
            res.status(401).json({ error: 'Invalid or missing API token' });
            return;
    }

    next();
}