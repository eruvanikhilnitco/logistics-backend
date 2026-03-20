import { createClient } from "@supabase/supabase-js";

// 🔥 Hardcode (temporary)
const supabaseUrl = "https://pzbwhpnxpmwnhxbqcggl.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6YndocG54cG13bmh4YnFjZ2dsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1ODY4MjIsImV4cCI6MjA4NzE2MjgyMn0.m5JCmjnGTn04svBe0PfD3FjelvbI6d0hI0GDI0DzevA";

export const supabase = createClient(supabaseUrl, supabaseKey);