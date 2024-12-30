export interface EmailTemplate {
  id: string
  name: string
  subject: string
  status: "payment_pending" | "processing" | "shipped" | "delivered" | "cancelled"
  description: string
  type: "physical" | "esim" | "both"
  variables: string[]
  content?: string
}

export const getStatusColor = (status: EmailTemplate["status"]) => {
  const colors = {
    payment_pending: "bg-[#8E9196] hover:bg-[#8E9196]/90",
    processing: "bg-[#9b87f5] hover:bg-[#9b87f5]/90",
    shipped: "bg-[#7E69AB] hover:bg-[#7E69AB]/90",
    delivered: "bg-[#6E59A5] hover:bg-[#6E59A5]/90",
    cancelled: "bg-[#1A1F2C] hover:bg-[#1A1F2C]/90"
  }
  return colors[status]
}

export const getStatusLabel = (status: EmailTemplate["status"]) => {
  const labels = {
    payment_pending: "Pago Pendiente",
    processing: "En Preparación",
    shipped: "En Tránsito",
    delivered: "Entregado",
    cancelled: "Cancelado"
  }
  return labels[status]
}

export const getStatusIcon = (status: EmailTemplate["status"]) => {
  const icons = {
    payment_pending: "MailWarning",
    processing: "Mail",
    shipped: "Mail",
    delivered: "MailCheck",
    cancelled: "MailX"
  }
  return icons[status]
}