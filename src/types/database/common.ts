export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface OrderEvent {
  id: string
  order_id: string
  type: string
  description: string
  user_id?: string | null
  metadata?: Json | null
  created_at: string
}

export interface ShippingAddress {
  street: string
  city: string
  state: string
  country: string
  postal_code: string
  phone?: string
}