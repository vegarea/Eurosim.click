import { OrderStatus } from "@/types/database/enums"
import { statusConfig } from "./OrderStatusBadge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { RefreshCw } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

interface OrderStatusControlProps {
  currentStatus: OrderStatus
  orderType: "physical" | "esim"
  orderId: string
  onStatusChange: (newStatus: OrderStatus) => void
}

export function OrderStatusControl({ 
  currentStatus, 
  orderType,
  orderId,
  onStatusChange 
}: OrderStatusControlProps) {
  const canChangeToShipped = orderType === "physical" && currentStatus === "processing"
  const canChangeToDelivered = 
    (currentStatus === "processing" && orderType === "esim") || 
    (currentStatus === "shipped" && orderType === "physical")

  const handleStatusChange = async (newStatus: OrderStatus) => {
    try {
      // Actualizar el estado de la orden
      const { error: orderError } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId)

      if (orderError) throw orderError

      // Crear evento de cambio de estado
      const { error: eventError } = await supabase
        .from('order_events')
        .insert({
          order_id: orderId,
          type: 'status_changed',
          description: `Estado actualizado de ${currentStatus} a ${newStatus}`,
          metadata: {
            old_status: currentStatus,
            new_status: newStatus,
            automated: false
          }
        })

      if (eventError) throw eventError

      onStatusChange(newStatus)
      toast.success('Estado actualizado correctamente')
    } catch (error) {
      console.error('Error al actualizar estado:', error)
      toast.error('Error al actualizar el estado')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RefreshCw className="h-5 w-5 text-gray-500" />
          Control de Estado
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <Select
            value={currentStatus}
            onValueChange={(value: OrderStatus) => handleStatusChange(value)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Seleccionar estado" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(statusConfig).map(([key, { label }]) => {
                const statusKey = key as OrderStatus
                let isDisabled = false

                if (statusKey === "shipped" && !canChangeToShipped) {
                  isDisabled = true
                }
                if (statusKey === "delivered" && !canChangeToDelivered) {
                  isDisabled = true
                }

                return (
                  <SelectItem 
                    key={key} 
                    value={key}
                    disabled={isDisabled}
                  >
                    {label}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}