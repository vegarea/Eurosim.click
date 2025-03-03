
import { Json } from "./database/common";

// Tipos para la página ThankYou, simplificados y sin referencias circulares
export interface ThankYouCustomer {
  name: string | null;
  email: string | null;
  phone: string | null;
}

export interface ThankYouOrder {
  id: string;
  status: string;
  type: string;
  total_amount: number;
  customer_id: string | null;
  payment_method: string | null;
  payment_status: string;
  shipping_address: Json | null;
  tracking_number: string | null;
  carrier: string | null;
  metadata: Json | null;
  created_at: string | null;
  // Agregamos customer para mantener compatibilidad con la UI
  customer?: ThankYouCustomer | null;
}

export interface ThankYouOrderItem {
  quantity: number;
  unit_price: number;
  total_price: number;
  metadata: Json | null;
}
