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

// Interfaz UI que extiende la orden de base de datos
export interface Order extends Omit<DatabaseOrder, 'notes'> {
  customer?: string;
  email?: string;
  phone?: string;
  title?: string;
  description?: string;
  total?: number;
  notes?: OrderNote[];
  events?: OrderEvent[];
  documentation?: CustomerDocumentation;
  // Asegurarnos de que usamos created_at en lugar de date
  created_at: string;
}