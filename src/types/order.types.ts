import { OrderStatus, PaymentStatus, OrderType, PaymentMethod } from './database.types';

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
  shipping_address?: {
    street: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
    phone: string;
  };
  tracking_number?: string;
  carrier?: string;
  activation_date?: string;
  notes?: string[];
  metadata?: Record<string, any>;
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

// Tipo extendido para la UI que incluye campos calculados
export interface OrderUI extends Omit<BaseOrder, 'total_amount' | 'shipping_address'> {
  customer?: string;
  email?: string;
  phone?: string;
  title?: string;
  description?: string;
  total: number;
  date: string;
  shippingAddress?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  passportNumber?: string;
  birthDate?: string;
  gender?: string;
  activationDate?: string;
  events?: OrderEvent[];
  formatted_notes?: OrderNote[];
}

// Tipo que incluye todas las relaciones completas
export interface OrderWithRelations extends BaseOrder {
  customer: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    passport_number?: string;
    birth_date?: string;
    gender?: string;
  };
  events: OrderEvent[];
  formatted_notes: OrderNote[];
}