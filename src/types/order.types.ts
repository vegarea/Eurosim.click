import { OrderStatus, PaymentStatus, OrderType, PaymentMethod, DatabaseOrder, ShippingAddress } from './database.types';

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

// Extendemos DatabaseOrder para la UI
export interface Order extends DatabaseOrder {
  customer?: string;
  email?: string;
  phone?: string;
  title?: string;
  description?: string;
  notes?: OrderNote[];
  events?: OrderEvent[];
  documentation?: CustomerDocumentation;
}