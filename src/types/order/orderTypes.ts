import { Json } from "@/integrations/supabase/types"

export type OrderStatus = 'payment_pending' | 'payment_failed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type OrderType = 'physical' | 'esim';
export type PaymentMethod = 'stripe' | 'paypal';

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  phone: string;
}

export interface OrderCustomer {
  name: string;
  email: string;
  phone?: string;
}

export interface OrderProduct {
  title: string;
  description: string;
  price: number;
}

// Tipo para crear una nueva orden en Supabase
export interface CreateOrderDTO {
  customer_id: string;
  product_id: string;
  type: OrderType;
  status?: OrderStatus;
  payment_status?: PaymentStatus;
  total_amount: number;
  quantity: number;
  shipping_address?: Json;
  activation_date?: string;
  notes?: string[];
  metadata?: Json;
}

// Tipo completo de una orden
export interface Order {
  id: string;
  customer_id: string;
  product_id: string;
  customer?: OrderCustomer;
  status: OrderStatus;
  type: OrderType;
  total_amount: number;
  quantity: number;
  payment_method?: PaymentMethod;
  payment_status: PaymentStatus;
  shipping_address?: ShippingAddress;
  tracking_number?: string;
  carrier?: string;
  activation_date?: string;
  notes: OrderNote[];
  product?: OrderProduct;
  created_at: string;
  updated_at: string;
}

export interface OrderNote {
  id: string;
  order_id: string;
  user_id: string;
  content: string;
  type: string;
  is_internal: boolean;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
  user_name?: string;
}