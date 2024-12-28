import type { Json } from '../base'
import type { TableDefaults } from './base-table'

export interface OrdersTable extends TableDefaults {
  Row: {
    activation_date: string | null
    carrier: string | null
    created_at: string | null
    customer_id: string
    id: string
    metadata: Json | null
    notes: string[] | null
    payment_method: string | null
    payment_status: string
    paypal_order_id: string | null
    paypal_receipt_url: string | null
    product_id: string
    quantity: number
    shipping_address: Json | null
    status: string
    stripe_payment_intent_id: string | null
    stripe_receipt_url: string | null
    total_amount: number
    tracking_number: string | null
    type: string
    updated_at: string | null
  }
  Insert: {
    activation_date?: string | null
    carrier?: string | null
    created_at?: string | null
    customer_id: string
    id?: string
    metadata?: Json | null
    notes?: string[] | null
    payment_method?: string | null
    payment_status: string
    paypal_order_id?: string | null
    paypal_receipt_url?: string | null
    product_id: string
    quantity?: number
    shipping_address?: Json | null
    status: string
    stripe_payment_intent_id?: string | null
    stripe_receipt_url?: string | null
    total_amount: number
    tracking_number?: string | null
    type: string
    updated_at?: string | null
  }
  Update: {
    activation_date?: string | null
    carrier?: string | null
    created_at?: string | null
    customer_id?: string
    id?: string
    metadata?: Json | null
    notes?: string[] | null
    payment_method?: string | null
    payment_status?: string
    paypal_order_id?: string | null
    paypal_receipt_url?: string | null
    product_id?: string
    quantity?: number
    shipping_address?: Json | null
    status?: string
    stripe_payment_intent_id?: string | null
    stripe_receipt_url?: string | null
    total_amount?: number
    tracking_number?: string | null
    type?: string
    updated_at?: string | null
  }
  Relationships: [
    {
      foreignKeyName: "orders_customer_id_fkey"
      columns: ["customer_id"]
      isOneToOne: false
      referencedRelation: "customers"
      referencedColumns: ["id"]
    },
    {
      foreignKeyName: "orders_product_id_fkey"
      columns: ["product_id"]
      isOneToOne: false
      referencedRelation: "products"
      referencedColumns: ["id"]
    }
  ]
}