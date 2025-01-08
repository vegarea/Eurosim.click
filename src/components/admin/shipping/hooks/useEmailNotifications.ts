import { supabase } from "@/integrations/supabase/client"
import { Order } from "@/types/database/orders"
import { toast } from "sonner"
import { formatShippingAddress } from "../utils/formatters"

export const useEmailNotifications = () => {
  const sendShippingNotification = async (
    order: Order, 
    trackingNumber: string, 
    carrier: string
  ) => {
    try {
      // Obtener la plantilla de email para envío
      const { data: emailTemplate, error: templateError } = await supabase
        .from('email_templates')
        .select('*')
        .eq('type', order.type)
        .eq('status', 'shipped')
        .eq('is_active', true)
        .single()

      if (templateError) throw templateError
      if (!emailTemplate) throw new Error('No se encontró la plantilla de email')

      // Obtener datos del cliente
      const { data: customer, error: customerError } = await supabase
        .from('customers')
        .select('*')
        .eq('id', order.customer_id)
        .single()

      if (customerError) throw customerError
      if (!customer) throw new Error('No se encontró el cliente')

      // Preparar variables para el email
      const emailVariables = {
        nombre_cliente: customer.name,
        numero_pedido: order.id,
        numero_tracking: trackingNumber,
        empresa_envio: carrier,
        direccion_envio: formatShippingAddress(order.shipping_address),
        fecha_estimada: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        url_tracking: `https://track.carrier.com/${trackingNumber}` // Ajustar según el carrier
      }

      // Enviar el email
      const emailResponse = await supabase.functions.invoke('send-email', {
        body: {
          templateId: emailTemplate.id,
          to: [customer.email],
          variables: emailVariables
        }
      })

      console.log('✉️ Email de envío enviado:', emailResponse)
      
      if (emailResponse.error) {
        throw new Error(emailResponse.error)
      }

      toast.success("Notificación de envío enviada")
    } catch (error) {
      console.error('Error al enviar notificación:', error)
      toast.error("Error al enviar la notificación de envío")
      throw error
    }
  }

  return { sendShippingNotification }
}