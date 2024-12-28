import { Database } from "@/integrations/supabase/types";
import { Json } from "@/types/supabase/base";

export type OrderStatus = 'payment_pending' | 'payment_failed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type OrderType = 'physical' | 'esim';
export type PaymentMethod = 'stripe' | 'paypal';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

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

export type OrderWithDetails = Order & {
  customer: string;
  date: string;
  total: number;
};

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