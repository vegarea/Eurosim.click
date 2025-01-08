import { Database } from "@/integrations/supabase/types"

export type EmailTemplate = Database["public"]["Tables"]["email_templates"]["Row"]
export type EmailTemplateInsert = Database["public"]["Tables"]["email_templates"]["Insert"]
export type EmailTemplateUpdate = Database["public"]["Tables"]["email_templates"]["Update"]

// Import the OrderMetadata from the database types
export type { OrderMetadata } from "@/types/ui/orders"