import { useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import { OrderStatus } from "@/types/database/enums"
import { OrderEvent } from "@/types/database/common"
import { toast } from "sonner"

interface UseShippingActionsProps {
  setIsUpdating: (value: boolean) => void
  refetchOrders: () => Promise<void>
  setShowConfirmDialog: (value: boolean) => void
  setShowDeliveredDialog: (value: boolean) => void
}

export function useShippingActions({
  setIsUpdating,
  refetchOrders,
  setShowConfirmDialog,
  setShowDeliveredDialog
}: UseShippingActionsProps) {
  const handleConfirmShipment = async (
    orderId: string, 
    trackingNumber: string, 
    carrier: string
  ) => {
    try {
      setIsUpdating(true)

      // Actualizar la orden
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .update({
          status: 'shipped' as OrderStatus,
          tracking_number: trackingNumber,
          carrier: carrier
        })
        .eq('id', orderId)
        .select('*, customer(*)')
        .single()

      if (orderError) throw orderError

      // Crear evento de envío
      const shippingEvent: Omit<OrderEvent, "id"> = {
        order_id: orderId,
        type: "shipping_updated",
        description: `Pedido enviado con ${carrier}. Número de seguimiento: ${trackingNumber}`,
        metadata: {
          carrier,
          tracking_number: trackingNumber,
          automated: false
        },
        created_at: new Date().toISOString()
      }

      const { error: eventError } = await supabase
        .from('order_events')
        .insert(shippingEvent)

      if (eventError) throw eventError

      // Obtener la plantilla de email para envío
      const { data: emailTemplate, error: templateError } = await supabase
        .from('email_templates')
        .select('*')
        .eq('type', order.type)
        .eq('status', 'shipped')
        .eq('is_active', true)
        .single()

      if (templateError) throw templateError

      // Preparar variables para el email
      const emailVariables = {
        nombre_cliente: order.customer?.name,
        numero_pedido: order.id,
        numero_tracking: trackingNumber,
        empresa_envio: carrier,
        url_tracking: `https://track.carrier.com/${trackingNumber}`, // Ajustar según el carrier
        direccion_envio: order.shipping_address ? 
          `${order.shipping_address.street}, ${order.shipping_address.city}, ${order.shipping_address.state}` :
          'No disponible'
      }

      // Enviar el email
      if (order.customer?.email) {
        const emailResponse = await supabase.functions.invoke('send-email', {
          body: {
            templateId: emailTemplate.id,
            to: [order.customer.email],
            variables: emailVariables
          }
        })

        console.log('✉️ Email de envío enviado:', emailResponse)
      }

      await refetchOrders()
      toast.success("Envío confirmado correctamente")
      setShowConfirmDialog(false)
    } catch (error) {
      console.error('Error al confirmar envío:', error)
      toast.error("Error al confirmar el envío")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleConfirmDelivery = async (orderId: string) => {
    try {
      setIsUpdating(true)

      // Obtener la orden con datos del cliente
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .update({ status: 'delivered' as OrderStatus })
        .eq('id', orderId)
        .select('*, customer(*)')
        .single()

      if (orderError) throw orderError

      // Crear evento de entrega
      const deliveryEvent: Omit<OrderEvent, "id"> = {
        order_id: orderId,
        type: "status_changed",
        description: "Pedido marcado como entregado",
        metadata: {
          oldStatus: "shipped",
          newStatus: "delivered",
          automated: false
        },
        created_at: new Date().toISOString()
      }

      const { error: eventError } = await supabase
        .from('order_events')
        .insert(deliveryEvent)

      if (eventError) throw eventError

      // Obtener la plantilla de email para entrega
      const { data: emailTemplate, error: templateError } = await supabase
        .from('email_templates')
        .select('*')
        .eq('type', order.type)
        .eq('status', 'delivered')
        .eq('is_active', true)
        .single()

      if (templateError) throw templateError

      // Preparar variables para el email
      const emailVariables = {
        nombre_cliente: order.customer?.name,
        numero_pedido: order.id,
        fecha_entrega: new Date().toLocaleDateString()
      }

      // Enviar el email
      if (order.customer?.email) {
        const emailResponse = await supabase.functions.invoke('send-email', {
          body: {
            templateId: emailTemplate.id,
            to: [order.customer.email],
            variables: emailVariables
          }
        })

        console.log('✉️ Email de entrega enviado:', emailResponse)
      }

      await refetchOrders()
      toast.success("Entrega confirmada correctamente")
      setShowDeliveredDialog(false)
    } catch (error) {
      console.error('Error al confirmar entrega:', error)
      toast.error("Error al confirmar la entrega")
    } finally {
      setIsUpdating(false)
    }
  }

  return {
    handleConfirmShipment,
    handleConfirmDelivery
  }
}