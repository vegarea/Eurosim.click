import { useToast } from "@/components/ui/use-toast"
import { Order } from "@/types/database/orders"
import { useOrders } from "@/contexts/OrdersContext"
import { supabase } from "@/integrations/supabase/client"

export function useESimDelivery() {
  const { toast } = useToast()
  const { orders, updateOrder } = useOrders()
  const eSimOrders = orders.filter(order => order.type === "esim")

  const pendingOrders = eSimOrders.filter(order => order.status === "processing")
  const completedOrders = eSimOrders.filter(order => order.status === "delivered")

  const handleSendQR = async (order: Order) => {
    try {
      console.log('📱 Iniciando envío de QR para orden:', order.id)
      
      // Verificar plantilla antes de proceder
      const { data: template, error: templateError } = await supabase
        .from('email_templates')
        .select('*')
        .eq('type', 'esim')
        .eq('status', 'delivered')
        .eq('is_active', true)
        .single()

      if (templateError) {
        console.error('❌ Error al obtener plantilla:', templateError)
        throw new Error('No se encontró una plantilla activa para envío de QR')
      }

      console.log('✉️ Usando plantilla:', template.id)

      // Verificar datos del cliente
      const { data: customer, error: customerError } = await supabase
        .from('customers')
        .select('*')
        .eq('id', order.customer_id)
        .single()

      if (customerError) {
        console.error('❌ Error al obtener datos del cliente:', customerError)
        throw customerError
      }

      console.log('👤 Cliente encontrado:', customer.id)

      // Actualizamos el estado - esto disparará el trigger que enviará el email
      await updateOrder(order.id, { status: "delivered" })
      console.log('✅ Estado actualizado a delivered')

      // Registramos el evento
      const { error: eventError } = await supabase.from('order_events').insert({
        order_id: order.id,
        type: 'status_changed',
        description: 'eSIM QR enviado y pedido marcado como entregado'
      })

      if (eventError) {
        console.error('❌ Error al registrar evento:', eventError)
        throw eventError
      }

      console.log('✅ Evento registrado correctamente')

      toast({
        title: "QR enviado",
        description: `El QR del pedido ${order.id} ha sido enviado por email y marcado como entregado.`
      })
    } catch (error) {
      console.error('❌ Error al enviar QR:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo enviar el QR. Por favor, inténtalo de nuevo."
      })
    }
  }

  const handleMarkDelivered = async (order: Order) => {
    try {
      console.log('📦 Marcando orden como entregada:', order.id)
      
      // Verificar plantilla antes de proceder
      const { data: template, error: templateError } = await supabase
        .from('email_templates')
        .select('*')
        .eq('type', 'esim')
        .eq('status', 'delivered')
        .eq('is_active', true)
        .single()

      if (templateError) {
        console.error('❌ Error al obtener plantilla:', templateError)
        throw new Error('No se encontró una plantilla activa para envío de QR')
      }

      console.log('✉️ Usando plantilla:', template.id)

      // Verificar datos del cliente
      const { data: customer, error: customerError } = await supabase
        .from('customers')
        .select('*')
        .eq('id', order.customer_id)
        .single()

      if (customerError) {
        console.error('❌ Error al obtener datos del cliente:', customerError)
        throw customerError
      }

      console.log('👤 Cliente encontrado:', customer.id)

      // Actualizamos el estado - esto disparará el trigger que enviará el email
      await updateOrder(order.id, { status: "delivered" })
      console.log('✅ Estado actualizado a delivered')

      // Registramos el evento
      const { error: eventError } = await supabase.from('order_events').insert({
        order_id: order.id,
        type: 'status_changed',
        description: 'Pedido marcado como entregado'
      })

      if (eventError) {
        console.error('❌ Error al registrar evento:', eventError)
        throw eventError
      }

      console.log('✅ Evento registrado correctamente')

      toast({
        title: "Pedido entregado",
        description: `El pedido ${order.id} ha sido marcado como entregado.`
      })
    } catch (error) {
      console.error('❌ Error al marcar como entregado:', error)
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