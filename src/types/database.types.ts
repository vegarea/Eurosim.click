// Tipos base de la base de datos
export type OrderStatus = 'payment_pending' | 'payment_failed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type OrderType = 'physical' | 'esim';
export type PaymentMethod = 'stripe' | 'paypal';

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
  default_shipping_address?: ShippingAddress;
  billing_address?: any;
  preferred_language?: string;
  marketing_preferences?: any;
  stripe_customer_id?: string;
  paypal_customer_id?: string;
  metadata?: any;
  created_at: string;
  updated_at: string;
}