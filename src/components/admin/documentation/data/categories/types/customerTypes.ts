import { ChecklistCategory } from "../../../types/ChecklistTypes";

export const customerTypes: ChecklistCategory = {
  id: "customers",
  category: "Clientes",
  items: [
    {
      name: "Cliente",
      status: "pending",
      description: "Tipos encontrados en customers.md y componentes relacionados",
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
    }
  ]
};