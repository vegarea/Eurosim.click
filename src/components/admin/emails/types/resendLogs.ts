export interface ResendEmailLog {
  id: string;
  from: string;
  to: string[];
  created_at: string;
  subject: string;
  status: string;
  error?: {
    message: string;
    code: string;
  } | null;
}

export interface ResendEmailsResponse {
  data: ResendEmailLog[];
  total: number;
}