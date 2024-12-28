import { OrderStatus, PaymentStatus, OrderType, PaymentMethod } from './database.types';

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

export interface Order {
  id: string;
  customer: string;
  customer_id: string;
  email?: string;
  phone?: string;
  date: string;
  total: number;
  status: OrderStatus;
  type: "physical" | "esim";
  payment_method?: PaymentMethod;
  title?: string;
  description?: string;
  quantity?: number;
  shippingAddress?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  passportNumber?: string;
  birthDate?: string;
  gender?: string;
  activationDate?: string;
  created_at?: string;
  updated_at?: string;
  notes?: OrderNote[];
  events?: OrderEvent[];
}