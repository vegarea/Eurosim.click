import { OrderStatus, PaymentStatus, OrderType, PaymentMethod, Customer } from './database.types';

export interface OrderEvent {
  id: string;
  order_id: string;
  type: string;
  description: string;
  user_id?: string;
  metadata?: Record<string, any>;
  created_at: string;
  // Campo calculado para la UI
  user_name?: string;
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
  // Campo calculado para la UI
  user_name?: string;
}

// Tipo base que coincide exactamente con la estructura de la base de datos
export interface BaseOrder {
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
  notes?: string[];
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

// Tipo extendido que incluye campos calculados y transformados para la UI
export interface Order extends BaseOrder {
  // Campos calculados/transformados para la UI
  customer?: Customer;
  title?: string;
  description?: string;
  total?: number;
  date?: string;
  events?: OrderEvent[];
  formatted_notes?: OrderNote[];
}

// Tipo que incluye todas las relaciones completas
export interface OrderWithRelations extends BaseOrder {
  customer: Customer;
  events: OrderEvent[];
  notes: OrderNote[];
}