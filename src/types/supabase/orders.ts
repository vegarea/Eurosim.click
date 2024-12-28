import { Database } from "@/integrations/supabase/types";
import { Json } from "./base";

export type OrderStatus = 'payment_pending' | 'payment_failed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type OrderType = 'physical' | 'esim';
export type PaymentMethod = 'stripe' | 'paypal';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

// Tipo base de Supabase
export type Order = Database['public']['Tables']['orders']['Row'] & {
  customers?: {
    name: string;
    email: string | null;
    phone: string | null;
  };
  products?: {
    title: string;
    description: string;
  };
};

// Tipo transformado para la UI
export interface OrderWithDetails extends Omit<Order, 'total_amount' | 'created_at' | 'payment_method'> {
  customer: string;
  date: string;
  total: number;
  paymentMethod: PaymentMethod;
}

// Función de transformación
export function transformOrder(order: Order): OrderWithDetails {
  return {
    ...order,
    customer: order.customers?.name || 'Unknown',
    date: order.created_at || new Date().toISOString(),
    total: (order.total_amount || 0) / 100,
    paymentMethod: order.payment_method as PaymentMethod || 'stripe',
  };
}

export interface OrderEvent {
  id: string;
  order_id: string;
  type: string;
  description: string;
  user_id: string | null;
  metadata: Json | null;
  created_at: string | null;
}

export interface OrderNote {
  id: string;
  order_id: string;
  text: string;
  user_id: string;
  created_at: string | null;
}