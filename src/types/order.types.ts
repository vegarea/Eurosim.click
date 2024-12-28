import { OrderStatus, PaymentStatus, OrderType, PaymentMethod } from './database.types';

// Tipo base que coincide con la estructura de la base de datos
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
  notes?: OrderNote[];
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

// Tipo para la UI que incluye campos calculados
export interface Order extends BaseOrder {
  // Campos calculados para la UI
  customer?: string;
  email?: string;
  phone?: string;
  title?: string;
  description?: string;
  total?: number;
  date?: string;
  events?: OrderEvent[];
  // Campos UI mapeados desde shipping_address
  shippingAddress?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  // Campos UI mapeados desde customer
  passportNumber?: string;
  birthDate?: string;
  gender?: string;
  activationDate?: string;
}

// Tipo que incluye todas las relaciones completas
export interface OrderWithRelations extends BaseOrder {
  customer_details: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    passport_number?: string;
    birth_date?: string;
    gender?: string;
  };
  events: OrderEvent[];
  notes: OrderNote[];
}