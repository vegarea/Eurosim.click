export interface EmailQueueItem {
  id: string;
  order_id: string;
  template_id: string | null;
  status: 'pending' | 'processing' | 'sent' | 'failed';
  priority: number;
  retry_count: number;
  next_retry_at: string | null;
  error: string | null;
  metadata: {
    order_type: 'physical' | 'esim';
    order_status: string;
    customer_id: string;
  };
  backoff_interval: string;
  created_at: string;
}

export interface EmailTemplate {
  id: string;
  subject: string;
  content: string;
  variables: Record<string, string>;
}

export interface Customer {
  id: string;
  email: string;
  name: string;
}

export interface Order {
  id: string;
  status: string;
  type: 'physical' | 'esim';
  customer_id: string;
}