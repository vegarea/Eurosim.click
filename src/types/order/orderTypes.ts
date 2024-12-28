import { OrderStatus, PaymentStatus, OrderType, PaymentMethod } from '@/types/database.types';

export type { OrderStatus, PaymentStatus, OrderType, PaymentMethod };

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
  documentation?: CustomerDocumentation;
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
  status: OrderStatus;
  type: OrderType;
  total_amount: number;
  quantity: number;
  payment_method?: PaymentMethod;
  payment_status: PaymentStatus;
  shipping_address?: Record<string, any>;
  tracking_number?: string;
  carrier?: string;
  activation_date?: string;
  notes: OrderNote[];
  events?: OrderEvent[];
  product?: OrderProduct;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface CreateOrderDTO {
  customer_id: string;
  product_id: string;
  type: OrderType;
  total_amount: number;
  quantity: number;
  shipping_address?: Record<string, any>;
  activation_date?: string;
  notes?: string[];
  metadata?: Record<string, any>;
}