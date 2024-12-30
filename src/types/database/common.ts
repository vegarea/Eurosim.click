export interface OrderEvent {
  id: string
  type: "created" | "status_changed" | "payment_processed" | "shipping_updated" | "note_added" | "document_validated"
  description: string
  user_id?: string
  metadata?: {
    oldStatus?: string
    newStatus?: string
    automated?: boolean
    trackingNumber?: string
    carrier?: string
    [key: string]: any
  }
  created_at: string
}

export type Json = {
  [key: string]: any
}