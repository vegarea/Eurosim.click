export interface EmailLog {
  id: string;
  template_id: string;
  recipient: string;
  subject: string;
  status: string;
  error?: string;
  metadata?: Record<string, any>;
  created_at: string;
  cc_emails?: string[];
}