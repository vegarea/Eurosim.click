import { Json } from "./index"

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
  metadata?: Json
  created_at: string
}