import { ChecklistCategory } from "../../../types/ChecklistTypes";

export const workflowTypes: ChecklistCategory = {
  id: "workflows",
  category: "Flujos de Trabajo",
  items: [
    {
      name: "Workflow",
      status: "pending",
      description: "Tipos encontrados en workflows.md y componentes relacionados",
      locations: [
        "src/components/admin/documentation/types/WorkflowTypes.ts"
      ],
      currentTypes: [
        {
          name: "WorkflowItem",
          path: "src/components/admin/documentation/types/WorkflowTypes.ts",
          code: `type WorkflowItem = {
  id: string
  title: string
  description: string
  status: WorkflowStatus
  details?: string
  components?: string[]
  database?: string[]
}`
        }
      ],
      supabaseTypes: [
        {
          name: "Workflow",
          path: "src/types/supabase.ts",
          code: `type Workflow = Database["public"]["Tables"]["workflows"]["Row"] = {
  id: string
  title: string
  description: string
  status: Database["public"]["Enums"]["workflow_status"]
  category_id: string
  created_at: string
  updated_at: string | null
  metadata: Json | null
}`
        }
      ]
    }
  ]
};