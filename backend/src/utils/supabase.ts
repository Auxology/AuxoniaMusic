import { createClient } from '@supabase/supabase-js';
import config from "../config/config";

export const supabaseAdmin = createClient(
    config.supabaseURL,
    config.supabaseRoleKey
);

