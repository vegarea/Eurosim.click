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

export interface DatabaseOrder {
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
  shipping_address?: ShippingAddress;
  tracking_number?: string;
  carrier?: string;
  activation_date?: string;
  notes?: string[];
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}