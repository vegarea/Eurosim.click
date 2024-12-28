import { ChecklistCategory } from "../../../types/ChecklistTypes";

export const emailTypes: ChecklistCategory = {
  id: "emails",
  category: "Emails",
  items: [
    {
      name: "Plantilla de Email",
      status: "pending",
      description: "Tipos encontrados en email-templates.md y componentes relacionados",
      locations: [
        "src/components/admin/emails/types.ts"
      ],
      currentTypes: [
        {
          name: "EmailTemplate",
          path: "src/components/admin/emails/types.ts",
          code: `type EmailTemplate = {
  id: string
  name: string
  subject: string
  content: string
  variables: string[]
}`
        }
      ],
      supabaseTypes: [
        {
          name: "EmailTemplate",
          path: "src/types/supabase.ts",
          code: `type EmailTemplate = Database["public"]["Tables"]["email_templates"]["Row"] = {
  id: string
  name: string
  subject: string
  content: string
  variables: string[]
  type: Database["public"]["Enums"]["template_type"]
  status: Database["public"]["Enums"]["template_status"]
  created_at: string
  updated_at: string | null
  metadata: Json | null
}`
        }
      ]
    }
  ]
};