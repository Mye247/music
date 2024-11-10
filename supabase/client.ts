import { Database } from "@/database.types";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseKey) throw new Error("Supabase KEY is not defined");
if (!supabaseUrl) throw new Error("Supabase URL is not defined");

const supabase = createClient<Database>(supabaseUrl, supabaseKey);
