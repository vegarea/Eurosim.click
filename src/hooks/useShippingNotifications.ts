import { supabase } from "@/integrations/supabase/client"
import { Order } from "@/types/database/orders"
import { toast } from "sonner"

export const useShippingNotifications = () => {
  const notifyShipment = async (order: Order, trackingNumber: string, carrier: string) => {
    try {
      const { error } = await supabase.functions.invoke('notify-shipment', {
        body: {
          orderId: order.id,
          trackingNumber,
          carrier,
          customerEmail: order.customer?.email,
          customerName: order.customer?.name
        }
      })

      if (error) throw error

      toast.success('Notificaciones de envío enviadas')
    } catch (error) {
      console.error('Error sending shipping notifications:', error)
      toast.error('Error al enviar las notificaciones')
    }
  }

  return { notifyShipment }
}