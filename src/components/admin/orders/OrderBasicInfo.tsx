import { Order } from "@/types/order.types"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
} from "@/components/ui/card"

interface OrderBasicInfoProps {
  order: Order
}

export function OrderBasicInfo({ order }: OrderBasicInfoProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium mb-1">Cliente</h3>
            <p>{order.customer?.name || 'No especificado'}</p>
          </div>
          <div>
            <h3 className="font-medium mb-1">Fecha</h3>
            <p>{new Date(order.created_at).toLocaleDateString()}</p>
          </div>
          <div>
            <h3 className="font-medium mb-1">Total</h3>
            <p>${(order.total_amount / 100).toFixed(2)}</p>
          </div>
          <div>
            <h3 className="font-medium mb-1">Tipo</h3>
            <Badge variant="secondary" className="bg-gray-100">
              {order.type === "physical" ? "SIM Física" : "E-SIM"}
            </Badge>
          </div>
          <div>
            <h3 className="font-medium mb-1">Método de Pago</h3>
            <p className="capitalize">{order.payment_method || "No especificado"}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}