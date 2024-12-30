import { Json } from "./index"

export interface OrderEvent {
  id: string
  type: "created" | "status_changed" | "payment_processed" | "shipping_updated" | "note_added" | "document_validated"
  description: string
  created_at: string
  metadata?: {
    oldStatus?: string
    newStatus?: string
    automated?: boolean
    trackingNumber?: string
    carrier?: string
    [key: string]: any
  }
}

export interface UIOrderNote {
  id: string
  text: string
  user_id: string
  user_name: string
  created_at: string
}

export type { Json }