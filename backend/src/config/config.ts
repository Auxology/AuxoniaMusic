import dotenv from 'dotenv';
import * as process from "node:process";

dotenv.config();

interface Config {
    port: number;
    nodeEnv: string;
    origin: string;
    supabaseURL: string;
    supabaseKey: string;
    databaseURL: string;
}

const config: Config = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    origin: process.env.ORIGIN || 'http://localhost:5173',
    supabaseURL: process.env.SUPABASE_URL!,
    supabaseKey: process.env.SUPABASE_KEY!,
    databaseURL: process.env.DATABASE_URL!
};

export default config;