export type WorkflowStatus = 'working' | 'pending' | 'error';

export interface WorkflowItem {
  id: string;
  title: string;
  description: string;
  status: WorkflowStatus;
  details?: string;
}

export interface WorkflowCategory {
  id: string;
  title: string;
  items: WorkflowItem[];
}