export type OrderStatus = 'payment_pending' | 'payment_failed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type OrderType = 'physical' | 'esim';
export type PaymentMethod = 'stripe' | 'paypal';

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

export interface OrderEvent {
  id: string;
  order_id: string;
  type: string;
  description: string;
  user_id?: string;
  metadata?: Record<string, any>;
  created_at: string;
}

export interface Payment {
  id: string;
  order_id: string;
  amount: number;
  currency: string;
  status: string;
  payment_method_id: string;
  provider_payment_id: string;
  provider_receipt_url?: string;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}