export type WorkflowStatus = 'working' | 'pending' | 'error';

export interface WorkflowItem {
  id: string;
  title: string;
  description: string;
  status: WorkflowStatus;
  details?: string;
  components?: string[];
  database?: string[];
  created_at?: string;
  updated_at?: string;
  metadata?: Record<string, any>;
}

export interface WorkflowCategory {
  id: string;
  title: string;
  items: WorkflowItem[];
  description?: string;
  icon?: string;
  metadata?: Record<string, any>;
}