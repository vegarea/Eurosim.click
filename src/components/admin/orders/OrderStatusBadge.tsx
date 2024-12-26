import { Badge } from "@/components/ui/badge"
import { 
  AlertCircle, 
  RefreshCw, 
  Check, 
  CreditCard,
  Truck,
  Ban
} from "lucide-react"

export const statusConfig = {
  payment_pending: {
    label: "Pago Pendiente",
    color: "bg-yellow-100 text-yellow-800",
    icon: CreditCard,
  },
  payment_failed: {
    label: "Error de Pago",
    color: "bg-red-100 text-red-800",
    icon: AlertCircle,
  },
  processing: {
    label: "En Preparación",
    color: "bg-blue-100 text-blue-800",
    icon: RefreshCw,
  },
  shipped: {
    label: "En Tránsito",
    color: "bg-orange-100 text-orange-800",
    icon: Truck,
  },
  delivered: {
    label: "Entregado",
    color: "bg-green-100 text-green-800",
    icon: Check,
  },
  cancelled: {
    label: "Cancelado",
    color: "bg-gray-100 text-gray-800",
    icon: Ban,
  },
}

interface OrderStatusBadgeProps {
  status: keyof typeof statusConfig
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const config = statusConfig[status]
  const StatusIcon = config.icon
  
  return (
    <Badge 
      variant="secondary" 
      className={`flex items-center gap-1 ${config.color}`}
    >
      <StatusIcon className="w-3 h-3" />
      {config.label}
    </Badge>
  )
}