import { Database } from "@/integrations/supabase/types"

export type EmailTemplate = Database["public"]["Tables"]["email_templates"]["Row"]
export type EmailTemplateInsert = Database["public"]["Tables"]["email_templates"]["Insert"]
export type EmailTemplateUpdate = Database["public"]["Tables"]["email_templates"]["Update"]

export interface OrderMetadata {
  activation_code?: string
  qr_code?: string
  activation_instructions?: string
  [key: string]: any
}