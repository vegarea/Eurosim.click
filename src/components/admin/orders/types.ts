import { Database } from "@/integrations/supabase/types";
import { OrderStatus, OrderType, PaymentMethod, PaymentStatus } from "@/types/database/enums";

export type { OrderStatus, OrderType, PaymentMethod, PaymentStatus };

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

export type Order = Database["public"]["Tables"]["orders"]["Row"] & {
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  events?: OrderEvent[];
  notes?: OrderNote[];
};