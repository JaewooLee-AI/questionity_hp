import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://fewzfqkqmdfbfqdtxmvf.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZld3pmcWtxbWRmYmZxZHR4bXZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY0MDkyNDAsImV4cCI6MjEwMTk4NTI0MH0.0HoqQJYdzdyJC7OFW8I9HO80QldD7LGEDAzmV4SFbpU";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
