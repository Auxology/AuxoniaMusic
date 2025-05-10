import sql from "../utils/pg";

export async function sqlGenerateApiToken(userId: string): Promise<boolean | string> {
    try {
        const exists = await sql`
            SELECT * FROM public.api_tokens
            WHERE user_id = ${userId}
        `;

        if (exists.length > 0) {
            console.error("Token already exists");
            return false;
        }

        await sql`
            INSERT INTO public.api_tokens (user_id)
            VALUES (${userId})
        `;

        return true;
    } catch (e) {
        console.error(e);
        return e instanceof Error ? e.message : 'An unknown error occurred';
    }
}

export async function sqlGetApiToken(userId:string) {
    try {
        const token = await sql`
            SELECT id from public.api_tokens
            WHERE user_id = ${userId}
        `;

        if (token.length === 0) {
            console.error("Token not found");
        }

        return token[0].id;
    }
    catch (e) {
        console.error(e);
        return e instanceof Error ? e.message : 'An unknown error occurred';
    }
}