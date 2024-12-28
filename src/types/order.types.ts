import { OrderStatus, PaymentStatus, OrderType, PaymentMethod, ShippingAddress } from './database.types';

export type { OrderStatus, PaymentStatus, OrderType, PaymentMethod, ShippingAddress };

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

export interface OrderEvent {
  id: string;
  order_id: string;
  type: string;
  description: string;
  user_id?: string;
  metadata?: Record<string, any>;
  created_at: string;
  user_name?: string;
}

export interface CustomerDocumentation {
  passportNumber?: string;
  birthDate?: string;
  gender?: string;
  activationDate?: string;
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

export interface Order {
  id: string;
  customer_id: string;
  product_id: string;
  customer?: OrderCustomer;
  email?: string;
  phone?: string;
  status: OrderStatus;
  type: OrderType;
  total_amount: number;
  total?: number;
  quantity: number;
  payment_method?: PaymentMethod;
  payment_status: PaymentStatus;
  title?: string;
  description?: string;
  stripe_payment_intent_id?: string;
  stripe_receipt_url?: string;
  paypal_order_id?: string;
  paypal_receipt_url?: string;
  shipping_address?: ShippingAddress;
  tracking_number?: string;
  carrier?: string;
  activation_date?: string;
  notes?: OrderNote[];
  events?: OrderEvent[];
  documentation?: CustomerDocumentation;
  product?: OrderProduct;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}