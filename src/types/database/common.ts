export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface OrderEvent {
  id: string
  type: string
  description: string
  created_at: string
  metadata?: {
    oldStatus?: string
    newStatus?: string
    trackingNumber?: string
    carrier?: string
    automated: boolean
  }
}

export interface OrderMetadata {
  events?: OrderEvent[]
  product_title?: string
  product_data_eu?: number
  product_data_es?: number
  [key: string]: Json | undefined
}