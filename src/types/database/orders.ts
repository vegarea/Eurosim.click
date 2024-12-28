import { OrderStatus, OrderType, PaymentMethod, PaymentStatus } from "./enums";

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  phone: string;
}

export interface OrderNote {
  id: string;
  text: string;
  user_id: string;
  user_name: string;
  created_at: string;
}

export interface Order {
  id: string;
  customer_id: string;
  product_id: string;
  status: OrderStatus;
  type: OrderType;
  total_amount: number;
  quantity: number;
  payment_method?: PaymentMethod | null;
  payment_status: PaymentStatus;
  stripe_payment_intent_id?: string | null;
  stripe_receipt_url?: string | null;
  paypal_order_id?: string | null;
  paypal_receipt_url?: string | null;
  shipping_address?: ShippingAddress | null;
  tracking_number?: string | null;
  carrier?: string | null;
  activation_date?: string | null;
  notes?: OrderNote[] | null;
  metadata?: Record<string, any> | null;
  created_at?: string;
  updated_at?: string;
}

export type OrderInsert = Omit<Order, "id" | "created_at" | "updated_at">;
export type OrderUpdate = Partial<OrderInsert>;