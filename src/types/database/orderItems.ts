/**
 * @lovable-protected
 * This file contains types that match Supabase schema exactly.
 * DO NOT MODIFY without explicit user permission.
 */
import { Json } from "./common";

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  metadata: Json | null;
  created_at: string | null;
  updated_at: string | null;
}

export type OrderItemInsert = Omit<OrderItem, "id" | "created_at" | "updated_at">;
export type OrderItemUpdate = Partial<OrderItemInsert>;