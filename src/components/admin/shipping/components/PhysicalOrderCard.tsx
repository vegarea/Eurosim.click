import { Order } from "@/types/database/orders"
import { OrderStatusBadge } from "../../orders/OrderStatusBadge"
import { Button } from "@/components/ui/button"
import { Truck, CheckCircle2 } from "lucide-react"

interface PhysicalOrderCardProps {
  order: Order
  onShipOrder: (order: Order) => void
  onMarkDelivered: (order: Order) => void
  isUpdating: boolean
}

export function PhysicalOrderCard({
  order,
  onShipOrder,
  onMarkDelivered,
  isUpdating
}: PhysicalOrderCardProps) {
  const canChangeToShipped = order.type === "physical" && order.status === "processing"
  const canChangeToDelivered = order.status === "shipped"

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-medium">Pedido #{order.id}</h3>
          <p className="text-sm text-gray-500">
            {order.customer?.name || "Cliente no registrado"}
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          {order.tracking_number && (
            <>
              <p>Tracking: {order.tracking_number}</p>
              <p>Carrier: {order.carrier}</p>
            </>
          )}
        </div>
        
        <div className="space-x-2">
          {canChangeToShipped && (
            <Button
              onClick={() => onShipOrder(order)}
              disabled={isUpdating}
              className="gap-2"
            >
              <Truck className="h-4 w-4" />
              Confirmar Envío
            </Button>
          )}
          {canChangeToDelivered && (
            <Button
              onClick={() => onMarkDelivered(order)}
              disabled={isUpdating}
              variant="outline"
              className="gap-2"
            >
              <CheckCircle2 className="h-4 w-4" />
              Marcar como Entregado
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}