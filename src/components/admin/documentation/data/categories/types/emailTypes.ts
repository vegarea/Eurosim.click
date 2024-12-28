import { ChecklistCategory } from "../../../types/ChecklistTypes";

export const emailTypes: ChecklistCategory = {
  id: "emails",
  category: "Emails y Notificaciones",
  items: [
    {
      name: "EmailTemplate",
      status: "pending",
      description: "Plantillas de email con variables dinámicas y tipos de contenido",
      locations: [
        "src/components/admin/emails/types.ts",
        "src/components/admin/emails/EmailTemplateDialog.tsx"
      ],
      currentTypes: [
        {
          name: "EmailTemplate",
          path: "src/components/admin/emails/types.ts",
          code: `interface EmailTemplate {
  id: string
  name: string
  subject: string
  content: string
  variables: string[]
  type: "physical" | "esim" | "both"
  status: "active" | "inactive"
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