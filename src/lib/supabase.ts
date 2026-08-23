import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ucfoqrlsbzhmivkvoqnq.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjZm9xcmxzYnpobWl2a3ZvcW5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc0ODI5MDAsImV4cCI6MjEwMzA1ODkwMH0.13yd36YaONUWPEGfigdiDthtBUeXDc5rItUVz9Piy24";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);