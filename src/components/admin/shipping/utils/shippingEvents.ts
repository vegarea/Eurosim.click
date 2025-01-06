import { OrderEvent } from "@/types/database/common"
import { OrderStatus } from "@/types/database/enums"

export const createShippingConfirmationEvent = (
  orderId: string,
  trackingNumber: string, 
  carrier: string
): Omit<OrderEvent, 'id'> => ({
  order_id: orderId,
  type: "shipping_updated",
  description: `Pedido enviado con ${carrier}. Número de seguimiento: ${trackingNumber}`,
  created_at: new Date().toISOString(),
  metadata: {
    oldStatus: "processing" as OrderStatus,
    newStatus: "shipped" as OrderStatus,
    trackingNumber,
    carrier,
    automated: false
  }
})

export const createDeliveryConfirmationEvent = (
  orderId: string
): Omit<OrderEvent, 'id'> => ({
  order_id: orderId,
  type: "status_changed",
  description: "Pedido marcado como entregado",
  created_at: new Date().toISOString(),
  metadata: {
    oldStatus: "shipped" as OrderStatus,
    newStatus: "delivered" as OrderStatus,
    automated: false
  }
})