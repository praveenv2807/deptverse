import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://bcxziwwtfvfjxfylipcv.supabase.co";
const supabaseAnonKey = "sb_publishable_FbFdOGIeqAwtY6BeaiedfA_Z4XVuBPf";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
