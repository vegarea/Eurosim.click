import { OrderEvent, OrderStatus } from "../../orders/types"

export const createShippingConfirmationEvent = (
  trackingNumber: string, 
  carrier: string
): OrderEvent => ({
  id: crypto.randomUUID(),
  type: "status_changed",
  description: `Envío confirmado con ${carrier}. Número de tracking: ${trackingNumber}`,
  userId: "current-user-id", // Esto debería venir del contexto de autenticación
  userName: "Manager Name", // Esto debería venir del contexto de autenticación
  createdAt: new Date().toISOString(),
  metadata: {
    oldStatus: "processing" as OrderStatus,
    newStatus: "shipped" as OrderStatus,
    trackingNumber,
    carrier,
    automated: false
  }
})

export const createDeliveryConfirmationEvent = (): OrderEvent => ({
  id: crypto.randomUUID(),
  type: "status_changed",
  description: "Pedido marcado como entregado",
  userId: "current-user-id", // Esto debería venir del contexto de autenticación
  userName: "Manager Name", // Esto debería venir del contexto de autenticación
  createdAt: new Date().toISOString(),
  metadata: {
    oldStatus: "shipped" as OrderStatus,
    newStatus: "delivered" as OrderStatus,
    automated: false
  }
})