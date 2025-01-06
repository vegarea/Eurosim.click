export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type EventType = 
  | "created" 
  | "status_changed" 
  | "payment_processed" 
  | "shipping_updated" 
  | "note_added" 
  | "document_validated"

export interface OrderEvent {
  id: string
  order_id: string
  type: EventType
  description: string
  metadata?: {
    automated?: boolean
    oldStatus?: string
    newStatus?: string
    details?: string
    [key: string]: any
  }
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