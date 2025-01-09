import { Json } from "@/integrations/supabase/types";

export interface EmailLog {
  id: string;
  template_id: string;
  recipient: string;
  subject: string;
  status: string;
  error: string | null;
  metadata: Json | null;
  created_at: string;
  cc_emails: Json | null;
}