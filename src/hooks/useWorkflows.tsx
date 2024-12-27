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

interface WorkflowCategory {
  id: string
  title: string
  description: string
  slug: string
  icon?: string
  metadata?: Record<string, any>
  created_at: string
  updated_at: string
}

// Simulamos la obtención de datos de la base de datos
// Esto se reemplazará con llamadas reales a Supabase cuando se integre
const fetchWorkflowData = async () => {
  // Por ahora usamos los datos estáticos
  const { workflowData } = await import("../components/admin/documentation/data/workflowData")
  return workflowData
}

export function useWorkflows() {
  return useQuery({
    queryKey: ['workflows'],
    queryFn: fetchWorkflowData,
    refetchInterval: 30000, // Refresca cada 30 segundos
  })
}