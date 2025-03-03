
import { Json } from "./database/common";

// Tipos específicos simplificados para la página ThankYou
export interface ThankYouOrder {
  id: string;
  customer_id: string | null;
  product_id: string;
  status: string;
  type: string;
  total_amount: number;
  quantity: number;
  payment_method: string | null;
  payment_status: string;
  stripe_payment_intent_id: string | null;
  stripe_receipt_url: string | null;
  paypal_order_id: string | null;
  paypal_receipt_url: string | null;
  shipping_address: Json | null;
  tracking_number: string | null;
  carrier: string | null;
  activation_date: string | null;
  metadata: Json | null;
  created_at: string | null;
  updated_at: string | null;
  // Cliente simplificado
  customer?: {
    name: string | null;
    email: string | null;
    phone: string | null;
  };
}

export interface ThankYouOrderItem {
  quantity: number;
  unit_price: number;
  total_price: number;
  metadata: Json | null;
}
