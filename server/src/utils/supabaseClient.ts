import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ifqtlgtoxolrskahoibu.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmcXRsZ3RveG9scnNrYWhvaWJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIyMzc5MTgsImV4cCI6MjAzNzgxMzkxOH0.67ZLacXwKf7YSyQhb4t3ifAg2agpzpbox4QGzAUeb5s";
export const supabase = createClient(supabaseUrl, supabaseKey);
