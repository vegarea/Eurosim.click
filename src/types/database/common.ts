import { Json } from "@/integrations/supabase/types"

export type { Json }

export interface ShippingAddress {
  street: string
  city: string
  state: string
  country: string
  postal_code: string
  phone?: string
}

export interface OrderEventMetadata {
  automated?: boolean
  oldStatus?: string
  newStatus?: string
  details?: string
  [key: string]: any
}

export interface OrderEvent {
  id: string
  order_id: string
  type: EventType
  description: string
  user_id?: string | null
  metadata?: OrderEventMetadata
  created_at: string
}

export type EventType = 
  | 'created'
  | 'status_changed'
  | 'payment_processed'
  | 'shipping_updated'
  | 'note_added'
  | 'document_validated'