export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface OrderEvent {
  id: string
  type: "created" | "status_changed" | "payment_processed" | "shipping_updated" | "note_added" | "document_validated"
  description: string
  user_id?: string
  metadata?: Record<string, any>
  created_at: string
}