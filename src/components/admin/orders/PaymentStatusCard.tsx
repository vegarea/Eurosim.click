import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CreditCard } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { OrderStatus } from "./types"
import { statusConfig } from "./OrderStatusBadge"

interface PaymentStatusCardProps {
  status: OrderStatus
  paymentMethod?: string
  orderDate: string
  onStatusChange: (newStatus: OrderStatus) => void
}

export function PaymentStatusCard({ 
  status, 
  paymentMethod, 
  orderDate,
  onStatusChange 
}: PaymentStatusCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-gray-500" />
          Información de Pago
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-medium mb-1">Método de Pago</h3>
            <p className="capitalize">{paymentMethod || "No especificado"}</p>
          </div>
          <div>
            <h3 className="font-medium mb-1">Estado del Pago</h3>
            <Select
              value={status}
              onValueChange={onStatusChange}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Seleccionar estado" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(statusConfig).map(([key, { label }]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <h3 className="font-medium mb-1">Fecha del Pedido</h3>
            <p>{new Date(orderDate).toLocaleDateString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}