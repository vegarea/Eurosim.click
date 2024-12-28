import { Order as DatabaseOrder } from "@/types/database/orders"

export interface OrderEvent {
  id: string;
  type: string;
  description: string;
  user_id?: string;
  user_name?: string;
  created_at: string;
  metadata?: Record<string, any>;
}

export interface OrderNote {
  id: string;
  text: string;
  user_id: string;
  user_name: string;
  created_at: string;
}

// Extender el tipo Order de la base de datos para incluir campos adicionales de UI
export interface Order extends DatabaseOrder {
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  events?: OrderEvent[];
}