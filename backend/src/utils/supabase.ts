import { createClient } from '@supabase/supabase-js';
import config from "../config/config";

const supabaseUrl = config.supabaseURL;
const supabaseKey = config.supabaseKey;

export const supabase = createClient(supabaseUrl, supabaseKey);