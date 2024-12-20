import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://tzjyrxnthfmcovazboly.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6anlyeG50aGZtY292YXpib2x5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE1MDI0MjksImV4cCI6MjA0NzA3ODQyOX0.VJSc_d0-DmCg416jvB4vJjCvDME7WfRZk_oG23M1Urc";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
