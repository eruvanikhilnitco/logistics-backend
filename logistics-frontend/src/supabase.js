import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY; // ✅ FIXED NAME

// 🔥 Debug (remove later)
console.log("Supabase URL:", supabaseUrl);

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase env variables are missing");
}

export const supabase = createClient(supabaseUrl, supabaseKey);