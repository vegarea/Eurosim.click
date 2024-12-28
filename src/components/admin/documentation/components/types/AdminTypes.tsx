export const adminTypes = [
  {
    name: "EmailTemplate",
    currentType: `interface EmailTemplate {
  id: string
  name: string
  subject: string
  content: string
  variables: string[]
  type: "esim" | "physical" | "both"
  status: "active" | "inactive"
}`,
    supabaseType: `type EmailTemplate = Database["public"]["Tables"]["email_templates"]["Row"] = {
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
}`,
    locations: [
      "src/components/admin/emails/types.ts",
      "src/components/admin/emails/EmailTemplateDialog.tsx"
    ],
    category: "component",
    status: "pending"
  },
  {
    name: "Product",
    currentType: `interface Product {
  id: string
  type: "physical" | "esim"
  title: string
  description: string
  price: number
  features: string[]
  europeGB?: number
  spainGB?: number
  created_at: Date
  updated_at: Date
  status: "active" | "inactive"
  stock?: number
  metadata?: Record<string, any>
}`,
    supabaseType: `type Product = Database["public"]["Tables"]["products"]["Row"] = {
  id: string
  type: Database["public"]["Enums"]["product_type"]
  title: string
  description: string
  price: number
  features: string[]
  europe_gb: number | null
  spain_gb: number | null
  created_at: string
  updated_at: string | null
  status: Database["public"]["Enums"]["product_status"]
  stock: number | null
  metadata: Json | null
}`,
    locations: [
      "src/components/admin/products/types.ts",
      "src/components/admin/AdminProducts.tsx"
    ],
    category: "component",
    status: "pending"
  }
]