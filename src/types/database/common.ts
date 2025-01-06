export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  phone?: string;
}

export interface OrderEvent {
  id: string;
  order_id: string;
  type: EventType;
  description: string;
  user_id?: string;
  metadata?: Json;
  created_at: string;
}