import { OrderEvent } from "@/types/database/common";
import { OrderStatus } from "@/types/database/enums";

export const createShippingConfirmationEvent = (
  trackingNumber: string, 
  carrier: string
): OrderEvent => ({
  id: crypto.randomUUID(),
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
});

export const createDeliveryConfirmationEvent = (): OrderEvent => ({
  id: crypto.randomUUID(),
  type: "status_changed",
  description: "Pedido marcado como entregado",
  created_at: new Date().toISOString(),
  metadata: {
    oldStatus: "shipped" as OrderStatus,
    newStatus: "delivered" as OrderStatus,
    automated: false
  }
});