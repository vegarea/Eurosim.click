import { OrderStatus, PaymentStatus, OrderType, PaymentMethod, Customer } from './database.types';

export interface OrderEvent {
  id: string;
  order_id: string;
  type: string;
  description: string;
  user_id?: string;
  metadata?: Record<string, any>;
  created_at: string;
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
}

export interface Order {
  id: string;
  customer_id: string;
  product_id: string;
  status: OrderStatus;
  type: OrderType;
  total_amount: number;
  quantity: number;
  payment_method?: PaymentMethod;
  payment_status: PaymentStatus;
  stripe_payment_intent_id?: string;
  stripe_receipt_url?: string;
  paypal_order_id?: string;
  paypal_receipt_url?: string;
  shipping_address?: Record<string, any>;
  tracking_number?: string;
  carrier?: string;
  activation_date?: string;
  notes?: OrderNote[];
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
  
  // Campos calculados/relacionados
  customer?: Customer;
  events?: OrderEvent[];
  total?: number;
}

export interface OrderWithRelations extends Order {
  customer: Customer;
  events: OrderEvent[];
}