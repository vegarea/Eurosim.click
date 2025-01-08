import { supabase } from "@/integrations/supabase/client"
import { OrderStatus } from "@/types/database/enums"
import { toast } from "sonner"
import { useEmailNotifications } from "./useEmailNotifications"

export const useOrderStatusUpdate = () => {
  const { sendShippingNotification } = useEmailNotifications()

  const updateOrderStatus = async (
    orderId: string,
    status: OrderStatus,
    trackingNumber?: string,
    carrier?: string
  ) => {
    try {
      const updates: any = { status }
      
      if (trackingNumber && carrier) {
        updates.tracking_number = trackingNumber
        updates.carrier = carrier
      }

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .update(updates)
        .eq('id', orderId)
        .select('*')
        .single()

      if (orderError) throw orderError

      // Crear evento de actualización
      const { error: eventError } = await supabase
        .from('order_events')
        .insert({
          order_id: orderId,
          type: 'status_changed',
          description: `Estado actualizado a ${status}`,
          metadata: {
            oldStatus: order.status,
            newStatus: status,
            trackingNumber,
            carrier,
            automated: false
          }
        })

      if (eventError) throw eventError

      // Si el estado es shipped y tenemos tracking, enviar notificación
      if (status === 'shipped' && trackingNumber && carrier) {
        await sendShippingNotification(order, trackingNumber, carrier)
      }

      toast.success("Estado actualizado correctamente")
      return order
    } catch (error) {
      console.error('Error al actualizar estado:', error)
      toast.error("Error al actualizar el estado")
      throw error
    }
  }

  return { updateOrderStatus }
}