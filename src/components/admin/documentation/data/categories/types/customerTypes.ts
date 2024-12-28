import { ChecklistCategory } from "../../../types/ChecklistTypes";

export const customerTypes: ChecklistCategory = {
  id: "customers",
  category: "Clientes y Documentación",
  items: [
    {
      name: "Customer",
      status: "pending",
      description: "Información principal del cliente y sus preferencias",
      locations: [
        "src/components/admin/customers/types.ts",
        "src/components/admin/customers/CustomersTable.tsx"
      ],
      currentTypes: [
        {
          name: "Customer",
          path: "src/components/admin/customers/types.ts",
          code: `type Customer = {
  id: string
  name: string
  email: string
  phone?: string
  orders: Order[]
  totalSpent: number
}`
        }
      ],
      supabaseTypes: [
        {
          name: "Customer",
          path: "src/types/supabase.ts",
          code: `type Customer = Database["public"]["Tables"]["customers"]["Row"] = {
  id: string
  name: string
  email: string
  phone: string | null
  passport_number: string | null
  birth_date: string | null
  gender: Database["public"]["Enums"]["gender"] | null
  default_shipping_address: Json | null
  billing_address: Json | null
  preferred_language: string | null
  marketing_preferences: Json | null
  stripe_customer_id: string | null
  paypal_customer_id: string | null
  metadata: Json | null
  created_at: string
  updated_at: string | null
}`
        }
      ]
    },
    {
      name: "CustomerDocument",
      status: "pending",
      description: "Documentos de identificación y validación del cliente",
      locations: [
        "src/components/checkout/DocumentationForm.tsx",
        "src/components/admin/customers/DocumentViewer.tsx"
      ],
      currentTypes: [
        {
          name: "CustomerDocument",
          path: "src/types/customer.ts",
          code: `interface CustomerDocument {
  id: string
  customerId: string
  type: string
  number: string
  expiryDate: Date
  country: string
  status: string
}`
        }
      ],
      supabaseTypes: [
        {
          name: "CustomerDocument",
          path: "src/types/supabase.ts",
          code: `type CustomerDocument = Database["public"]["Tables"]["customer_documents"]["Row"] = {
  id: string
  customer_id: string
  type: Database["public"]["Enums"]["document_type"]
  number: string
  expiry_date: string
  country: string
  status: Database["public"]["Enums"]["document_status"]
  created_at: string
  updated_at: string | null
  metadata: Json | null
}`
        }
      ]
    }
  ]
};