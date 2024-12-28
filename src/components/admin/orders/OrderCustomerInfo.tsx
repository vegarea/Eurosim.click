import { Order } from "@/types"
import { User, ExternalLink, Clock } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { OrderStatusControl } from "./OrderStatusControl"
import { OrderStatus } from "@/types"

interface OrderCustomerInfoProps {
  order: Order
  onStatusChange: (newStatus: OrderStatus) => void
}

export function OrderCustomerInfo({ order, onStatusChange }: OrderCustomerInfoProps) {
  const formatDateTime = (date: string) => {
    return new Date(date).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-gray-500" />
          Información del Cliente
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-1">Cliente</h3>
              <p className="flex items-center gap-2">
                {order.customer}
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="h-6 px-2"
                  onClick={() => window.open(`/admin/customers/${order.id}`, '_blank')}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Email</h3>
              <p>{order.email || "No especificado"}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Teléfono</h3>
              <p>{order.phone || "No especificado"}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Fecha y Hora</h3>
              <div className="flex items-center gap-1 text-gray-600">
                <Clock className="h-4 w-4" />
                <span>{formatDateTime(order.created_at)}</span>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <OrderStatusControl 
              currentStatus={order.status} 
              orderType={order.type}
              onStatusChange={onStatusChange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}