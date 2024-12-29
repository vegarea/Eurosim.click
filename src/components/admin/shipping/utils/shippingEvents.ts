import { Json } from "@/types/database/common";
import { OrderStatus } from "@/types/database/enums";

interface ShippingEvent {
  id: string;
  type: string;
  description: string;
  user_id: string;
  user_name: string;
  created_at: string;
  metadata: {
    oldStatus?: OrderStatus;
    newStatus?: OrderStatus;
    trackingNumber?: string;
    carrier?: string;
    automated: boolean;
  };
}

export const createShippingConfirmationEvent = (
  trackingNumber: string, 
  carrier: string
): ShippingEvent => ({
  id: crypto.randomUUID(),
  type: "status_changed",
  description: `Pedido enviado con ${carrier}. Número de seguimiento: ${trackingNumber}`,
  user_id: "current-user-id",
  user_name: "Manager Name",
  created_at: new Date().toISOString(),
  metadata: {
    oldStatus: "processing",
    newStatus: "shipped",
    trackingNumber,
    carrier,
    automated: false
  }
});

export const createDeliveryConfirmationEvent = (): ShippingEvent => ({
  id: crypto.randomUUID(),
  type: "status_changed",
  description: "Pedido marcado como entregado",
  user_id: "current-user-id",
  user_name: "Manager Name",
  created_at: new Date().toISOString(),
  metadata: {
    oldStatus: "shipped",
    newStatus: "delivered",
    automated: false
  }
});