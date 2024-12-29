import { OrderStatus, OrderType, PaymentMethod, PaymentStatus } from "./enums";
import { Json } from "./common";
import { OrderMetadata } from "./metadata";

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
  metadata: OrderMetadata | null;
  created_at: string | null;
  updated_at: string | null;
  events?: Array<{
    id: string;
    type: string;
    description: string;
    created_at: string;
    metadata?: Record<string, any>;
  }>;
}

export interface ExtendedOrder extends Order {
  customers?: {
    name: string | null;
    email: string | null;
    phone: string | null;
  } | null;
}