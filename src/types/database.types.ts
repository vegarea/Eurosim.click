export type OrderStatus = 'payment_pending' | 'payment_failed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type OrderType = 'physical' | 'esim';
export type PaymentMethod = 'stripe' | 'paypal';
export type UserRole = 'client' | 'manager' | 'admin';
export type DocumentStatus = 'pending' | 'validating' | 'approved' | 'rejected' | 'expired';

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  phone: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  passport_number?: string;
  birth_date?: string;
  gender?: string;
  default_shipping_address?: ShippingAddress | null;
  billing_address?: Record<string, any> | null;
  preferred_language?: string;
  marketing_preferences?: Record<string, any> | null;
  stripe_customer_id?: string;
  paypal_customer_id?: string;
  metadata?: Record<string, any> | null;
  created_at: string;
  updated_at: string;
}

export interface OrderStatusHistoryEntry {
  id: string;
  order_id: string;
  old_status: OrderStatus;
  new_status: OrderStatus;
  changed_by: string;
  reason?: string;
  metadata?: Record<string, any>;
  created_at: string;
}