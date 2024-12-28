import { ChecklistCategory } from "../../../types/ChecklistTypes";

export const authTypes: ChecklistCategory = {
  id: "auth",
  category: "Autenticación",
  items: [
    {
      name: "Auth Log",
      status: "pending",
      description: "Tipos encontrados en auth_logs.md y componentes relacionados",
      locations: [
        "src/components/admin/auth/types.ts"
      ],
      currentTypes: [
        {
          name: "AuthLog",
          path: "src/components/admin/auth/types.ts",
          code: `type AuthLog = {
  id: string
  userId: string
  event: string
  ip: string
  timestamp: Date
}`
        }
      ],
      supabaseTypes: [
        {
          name: "AuthLog",
          path: "src/types/supabase.ts",
          code: `type AuthLog = Database["public"]["Tables"]["auth_logs"]["Row"] = {
  id: string
  user_id: string
  event_type: Database["public"]["Enums"]["auth_event_type"]
  ip_address: string
  user_agent: string | null
  created_at: string
  metadata: Json | null
}`
        }
      ]
    }
  ]
};