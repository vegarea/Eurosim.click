import { OrderEvent } from '@/types';
import { getTrackingMessage } from "../config/carriers";

export const createShippingConfirmationEvent = (
  trackingNumber: string, 
  carrier: string
): OrderEvent => ({
  id: crypto.randomUUID(),
  order_id: '', // Se debe establecer al usar
  type: "status_changed",
  description: getTrackingMessage(carrier, trackingNumber),
  user_id: "current-user-id", // Esto debería venir del contexto de autenticación
  user_name: "Manager Name", // Esto debería venir del contexto de autenticación
  created_at: new Date().toISOString(),
  metadata: {
    oldStatus: "processing",
    newStatus: "shipped",
    trackingNumber,
    carrier,
    automated: false
  }
});

export const createDeliveryConfirmationEvent = (): OrderEvent => ({
  id: crypto.randomUUID(),
  order_id: '', // Se debe establecer al usar
  type: "status_changed",
  description: "Pedido marcado como entregado",
  user_id: "current-user-id", // Esto debería venir del contexto de autenticación
  user_name: "Manager Name", // Esto debería venir del contexto de autenticación
  created_at: new Date().toISOString(),
  metadata: {
    oldStatus: "shipped",
    newStatus: "delivered",
    automated: false
  }
});