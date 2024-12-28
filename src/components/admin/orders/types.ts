import { Database } from "@/integrations/supabase/types";

export type OrderStatus = Database["public"]["Enums"]["order_status"];
export type OrderType = Database["public"]["Enums"]["order_type"];
export type PaymentMethod = Database["public"]["Enums"]["payment_method"];
export type PaymentStatus = Database["public"]["Enums"]["payment_status"];

export interface OrderNote {
  id: string;
  text: string;
  userId: string;
  userName: string;
  createdAt: string;
}

export interface OrderEvent {
  id: string;
  date: string;
  type: string;
  description: string;
  metadata?: Record<string, any>;
}

export type Order = Database["public"]["Tables"]["orders"]["Row"] & {
  // Campos adicionales para la UI
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  product_title?: string;
  product_description?: string;
  formatted_date?: string;
  events?: OrderEvent[];
};

export type OrderInsert = Database["public"]["Tables"]["orders"]["Insert"];
export type OrderUpdate = Database["public"]["Tables"]["orders"]["Update"];