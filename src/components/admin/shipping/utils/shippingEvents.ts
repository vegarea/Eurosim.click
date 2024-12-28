import { OrderEvent } from "../../orders/types";
import { OrderStatus } from "@/types/database/enums";

export const createShippingConfirmationEvent = (
  trackingNumber: string, 
  carrier: string
): OrderEvent => ({
  id: crypto.randomUUID(),
  type: "status_changed",
  description: `Pedido enviado con ${carrier}. Número de seguimiento: ${trackingNumber}`,
  user_id: "current-user-id",
  user_name: "Manager Name",
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
  user_id: "current-user-id",
  user_name: "Manager Name",
  created_at: new Date().toISOString(),
  metadata: {
    oldStatus: "shipped" as OrderStatus,
    newStatus: "delivered" as OrderStatus,
    automated: false
  }
});