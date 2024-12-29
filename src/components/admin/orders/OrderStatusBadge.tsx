import { Badge } from "@/components/ui/badge"
import { OrderStatus } from "@/types/database/enums"

interface OrderStatusBadgeProps {
  status: OrderStatus
}

export const statusConfig: Record<OrderStatus, { label: string; color: string }> = {
  payment_pending: { label: "Pago pendiente", color: "bg-yellow-100 text-yellow-800" },
  payment_failed: { label: "Pago fallido", color: "bg-red-100 text-red-800" },
  processing: { label: "Procesando", color: "bg-blue-100 text-blue-800" },
  shipped: { label: "Enviado", color: "bg-purple-100 text-purple-800" },
  delivered: { label: "Entregado", color: "bg-green-100 text-green-800" },
  cancelled: { label: "Cancelado", color: "bg-gray-100 text-gray-800" }
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  return (
    <Badge variant="secondary" className={statusConfig[status].color}>
      {statusConfig[status].label}
    </Badge>
  )
}