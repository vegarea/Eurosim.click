import { useToast } from "@/components/ui/use-toast"
import { Order } from "@/types/database/orders"
import { useOrders } from "@/contexts/OrdersContext"
import { supabase } from "@/integrations/supabase/client"

interface OrderMetadata {
  activation_code?: string;
  qr_code_url?: string;
}

export function useESimDelivery() {
  const { toast } = useToast()
  const { orders, updateOrder } = useOrders()
  const eSimOrders = orders.filter(order => order.type === "esim")

  const pendingOrders = eSimOrders.filter(order => order.status === "processing")
  const completedOrders = eSimOrders.filter(order => order.status === "delivered")

  const handleSendQR = async (order: Order) => {
    try {
      // Primero actualizamos el estado
      await updateOrder(order.id, { status: "delivered" })

      // Registramos el evento
      await supabase.from('order_events').insert({
        order_id: order.id,
        type: 'status_changed',
        description: 'eSIM QR enviado y pedido marcado como entregado'
      })

      // Obtenemos la plantilla correcta
      const { data: template } = await supabase
        .from('email_templates')
        .select('*')
        .eq('type', 'esim')
        .eq('status', 'delivered')
        .eq('is_active', true)
        .single()

      if (!template) {
        throw new Error('No se encontró la plantilla de email activa')
      }

      const metadata = order.metadata as OrderMetadata;

      // Insertamos en la cola de emails con alta prioridad
      const { error: queueError } = await supabase.from('email_queue').insert({
        order_id: order.id,
        template_id: template.id,
        status: 'pending',
        priority: 1, // Alta prioridad para envío de QR
        metadata: {
          order_type: 'esim',
          order_status: 'delivered',
          customer_id: order.customer_id,
          variables: {
            nombre_cliente: order.customer?.name,
            numero_pedido: order.id,
            codigo_activacion: metadata?.activation_code,
            qr_code: metadata?.qr_code_url,
            fecha_activacion: order.activation_date,
            instrucciones_activacion: ''
          }
        }
      })

      if (queueError) throw queueError

      toast({
        title: "QR enviado",
        description: `El QR del pedido ${order.id} ha sido enviado por email y marcado como entregado.`
      })
    } catch (error) {
      console.error('Error al enviar QR:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo enviar el QR. Por favor, inténtalo de nuevo."
      })
    }
  }

  const handleMarkDelivered = async (order: Order) => {
    try {
      await updateOrder(order.id, { status: "delivered" })

      // Registramos el evento
      await supabase.from('order_events').insert({
        order_id: order.id,
        type: 'status_changed',
        description: 'Pedido marcado como entregado'
      })

      // Obtenemos la plantilla correcta
      const { data: template } = await supabase
        .from('email_templates')
        .select('*')
        .eq('type', 'esim')
        .eq('status', 'delivered')
        .eq('is_active', true)
        .single()

      if (!template) {
        throw new Error('No se encontró la plantilla de email activa')
      }

      const metadata = order.metadata as OrderMetadata;

      // Insertamos en la cola de emails
      const { error: queueError } = await supabase.from('email_queue').insert({
        order_id: order.id,
        template_id: template.id,
        status: 'pending',
        priority: 1, // Cambiado a prioridad 1 también
        metadata: {
          order_type: 'esim',
          order_status: 'delivered',
          customer_id: order.customer_id,
          variables: {
            nombre_cliente: order.customer?.name,
            numero_pedido: order.id,
            codigo_activacion: metadata?.activation_code,
            qr_code: metadata?.qr_code_url,
            fecha_activacion: order.activation_date,
            instrucciones_activacion: ''
          }
        }
      })

      if (queueError) throw queueError

      toast({
        title: "Pedido entregado",
        description: `El pedido ${order.id} ha sido marcado como entregado.`
      })
    } catch (error) {
      console.error('Error al marcar como entregado:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo actualizar el estado del pedido."
      })
    }
  }

  return {
    pendingOrders,
    completedOrders,
    handleSendQR,
    handleMarkDelivered
  }
}