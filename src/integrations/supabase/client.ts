// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://sgdypdsrkdviiyxdcwbp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnZHlwZHNya2R2aWl5eGRjd2JwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUzOTg3MTAsImV4cCI6MjA1MDk3NDcxMH0.piTEmOS_szum7RbqA3SETABrrd-r2Ya5dOzVdo3gp-k";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);