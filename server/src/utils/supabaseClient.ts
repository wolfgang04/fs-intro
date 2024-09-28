import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.DATABASE_URL as string;
const supabaseKey = process.env.DATABASE_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseKey);
