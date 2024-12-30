import { OrderStatus, OrderType, PaymentMethod, PaymentStatus } from "./enums";
import { Json, OrderEvent, OrderNote } from "./common";

export interface Order {
  id: string;
  customer_id: string;
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
  notes: OrderNote[] | null;
  metadata: Record<string, any> | null;
  created_at: string | null;
  updated_at: string | null;
  // UI specific fields
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  events?: OrderEvent[];
}

export type OrderInsert = Omit<Order, "id" | "created_at" | "updated_at">;
export type OrderUpdate = Partial<OrderInsert>;