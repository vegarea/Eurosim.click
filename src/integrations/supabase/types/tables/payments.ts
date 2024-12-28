import type { Json } from '../base'
import type { TableDefaults } from './base-table'

export interface PaymentsTable extends TableDefaults {
  Row: {
    amount: number
    created_at: string | null
    currency: string
    id: string
    metadata: Json | null
    order_id: string
    payment_method_id: string
    provider_payment_id: string
    provider_receipt_url: string | null
    status: string
    updated_at: string | null
  }
  Insert: {
    amount: number
    created_at?: string | null
    currency?: string
    id?: string
    metadata?: Json | null
    order_id: string
    payment_method_id: string
    provider_payment_id: string
    provider_receipt_url?: string | null
    status: string
    updated_at?: string | null
  }
  Update: {
    amount?: number
    created_at?: string | null
    currency?: string
    id?: string
    metadata?: Json | null
    order_id?: string
    payment_method_id?: string
    provider_payment_id?: string
    provider_receipt_url?: string | null
    status?: string
    updated_at?: string | null
  }
  Relationships: [
    {
      foreignKeyName: "payments_order_id_fkey"
      columns: ["order_id"]
      isOneToOne: false
      referencedRelation: "orders"
      referencedColumns: ["id"]
    }
  ]
}