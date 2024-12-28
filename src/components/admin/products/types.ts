export interface Product {
  id: string
  type: "physical" | "esim"
  title: string
  description: string
  price: number
  features: string[]
  data_eu_gb?: number
  data_es_gb?: number
  created_at: Date
  updated_at: Date
  status: "active" | "inactive" | "out_of_stock"
  stock?: number
  metadata?: Record<string, any>
}

export interface SupabaseProduct {
  id: string
  type: "physical" | "esim"
  title: string
  description: string
  price: number
  features: unknown
  data_eu_gb: number
  data_es_gb: number
  created_at: string
  updated_at: string
  status: "active" | "inactive" | "out_of_stock"
  stock: number | null
  metadata: Record<string, any> | null
}