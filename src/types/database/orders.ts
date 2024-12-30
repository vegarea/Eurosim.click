/**
 * @lovable-protected
 * This file contains types that match Supabase schema exactly.
 * DO NOT MODIFY without explicit user permission.
 */
import { OrderStatus, OrderType, PaymentMethod, PaymentStatus } from "./enums";
import { Json } from "./common";

export interface Order {
  id: string;
  customer_id: string | null;
  product_id: string;
  status: OrderStatus;
  type: OrderType;
  total_amount: number;
  quantity: number;
  payment_method: PaymentMethod | null;
  payment_status: PaymentStatus;
  stripe_payment_intent_id: string | null;
  stripe_receipt_url: string | null;
  paypal_order_id: string | null;
  paypal_receipt_url: string | null;
  shipping_address: Json | null;
  tracking_number: string | null;
  carrier: string | null;
  activation_date: string | null;
  notes: string[] | null;
  metadata: Json | null;
  created_at: string | null;
  updated_at: string | null;
}

export type OrderInsert = Omit<Order, "id" | "created_at" | "updated_at">;
export type OrderUpdate = Partial<OrderInsert>;