export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface OrderMetadata {
  product_title?: string
  product_data_eu?: number
  product_data_es?: number
  events?: Array<{
    id: string
    type: string
    description: string
    created_at: string
    user_id?: string
    user_name?: string
    metadata?: {
      oldStatus?: string
      newStatus?: string
      trackingNumber?: string
      carrier?: string
      automated?: boolean
    }
  }>
  [key: string]: Json | undefined
}