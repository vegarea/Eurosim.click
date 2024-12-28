import { useQuery } from "@tanstack/react-query"

interface WorkflowEvent {
  id: string
  workflow_id: string
  type: 'status_change' | 'note' | 'error'
  description: string
  metadata?: Record<string, any>
  user_id?: string
  created_at: string
}

interface Workflow {
  id: string
  category_id: string
  title: string
  description: string
  status: 'working' | 'pending' | 'error'
  components?: string[]
  database_tables?: string[]
  details?: string
  metadata?: Record<string, any>
  created_at: string
  updated_at: string
}

// Mock data directamente en el archivo en lugar de importarlo
const mockWorkflowData = {
  workflows: [
    {
      id: "1",
      category_id: "cat1",
      title: "Sample Workflow",
      description: "A sample workflow",
      status: "working",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ]
};

export function useWorkflows() {
  return useQuery({
    queryKey: ['workflows'],
    queryFn: async () => mockWorkflowData,
    refetchInterval: 30000, // Refresca cada 30 segundos
  })
}