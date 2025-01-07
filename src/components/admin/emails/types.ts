import { Json } from "@/integrations/supabase/types"

export interface EmailTemplate {
  id: string
  name: string
  subject: string
  content: string
  description: string
  type: "physical" | "esim" | "both"
  status: "payment_pending" | "processing" | "shipped" | "delivered" | "cancelled" | "payment_failed"
  variables: Json
  carrier_id?: string | null
  is_active: boolean
  created_at?: string
  updated_at?: string
  created_by?: string | null
  updated_by?: string | null
}

export const getStatusColor = (status: EmailTemplate["status"]) => {
  const colors = {
    payment_pending: "bg-[#8E9196] hover:bg-[#8E9196]/90",
    processing: "bg-[#9b87f5] hover:bg-[#9b87f5]/90",
    shipped: "bg-[#7E69AB] hover:bg-[#7E69AB]/90",
    delivered: "bg-[#6E59A5] hover:bg-[#6E59A5]/90",
    cancelled: "bg-[#1A1F2C] hover:bg-[#1A1F2C]/90",
    payment_failed: "bg-red-500 hover:bg-red-600"
  }
  return colors[status]
}

export const getStatusLabel = (status: EmailTemplate["status"]) => {
  const labels = {
    payment_pending: "Pago Pendiente",
    processing: "En Preparación",
    shipped: "En Tránsito",
    delivered: "Entregado",
    cancelled: "Cancelado",
    payment_failed: "Pago Fallido"
  }
  return labels[status]
}