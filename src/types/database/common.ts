
/**
 * @lovable-protected
 * This file contains types that match Supabase schema exactly.
 * DO NOT MODIFY without explicit user permission.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country?: string;
  phone?: string;
}

export interface OrderEvent {
  id: string;
  order_id: string;
  type: string;
  description: string;
  user_id?: string;
  metadata?: Json;
  created_at: string;
}
