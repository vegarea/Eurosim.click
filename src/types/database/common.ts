export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface OrderEvent {
  id: string;
  timestamp: string;
  type: string;
  description: string;
  metadata?: Json;
}

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  phone?: string;
}