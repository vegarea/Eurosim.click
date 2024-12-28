import { ChecklistCategory } from "../../../types/ChecklistTypes";

export const productTypes: ChecklistCategory = {
  id: "products",
  category: "Productos y Catálogo",
  items: [
    {
      name: "Productos",
      status: "pending",
      description: "Tipos encontrados en products.md y componentes de productos",
      locations: [
        "src/components/admin/products/types.ts",
        "src/components/SimCard.tsx",
        "src/components/admin/AdminProducts.tsx"
      ],
      currentTypes: [
        {
          name: "Product",
          path: "src/components/admin/products/types.ts",
          code: `interface Product {
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
}`
        }
      ],
      supabaseTypes: [
        {
          name: "Product",
          path: "src/types/supabase.ts",
          code: `type Product = Database["public"]["Tables"]["products"]["Row"] = {
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
}`
        }
      ]
    }
  ]
};