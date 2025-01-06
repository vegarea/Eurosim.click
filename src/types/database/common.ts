export type { Json } from "@/integrations/supabase/types"

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

// Re-export EventType to avoid ambiguity
export { EventType } from "./enums"