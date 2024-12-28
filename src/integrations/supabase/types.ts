export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      orders: {
        Row: {
          id: string
          customer_id: string
          product_id: string
          status: "payment_pending" | "payment_failed" | "processing" | "shipped" | "delivered" | "cancelled"
          type: "physical" | "esim"
          total_amount: number
          quantity: number
          payment_method: "stripe" | "paypal" | null
          payment_status: "pending" | "completed" | "failed" | "refunded"
          stripe_payment_intent_id: string | null
          stripe_receipt_url: string | null
          paypal_order_id: string | null
          paypal_receipt_url: string | null
          shipping_address: Json | null
          tracking_number: string | null
          carrier: string | null
          activation_date: string | null
          notes: string[] | null
          metadata: Json | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          customer_id: string
          product_id: string
          status?: "payment_pending" | "payment_failed" | "processing" | "shipped" | "delivered" | "cancelled"
          type: "physical" | "esim"
          total_amount: number
          quantity?: number
          payment_method?: "stripe" | "paypal" | null
          payment_status?: "pending" | "completed" | "failed" | "refunded"
          stripe_payment_intent_id?: string | null
          stripe_receipt_url?: string | null
          paypal_order_id?: string | null
          paypal_receipt_url?: string | null
          shipping_address?: Json | null
          tracking_number?: string | null
          carrier?: string | null
          activation_date?: string | null
          notes?: string[] | null
          metadata?: Json | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          customer_id?: string
          product_id?: string
          status?: "payment_pending" | "payment_failed" | "processing" | "shipped" | "delivered" | "cancelled"
          type?: "physical" | "esim"
          total_amount?: number
          quantity?: number
          payment_method?: "stripe" | "paypal" | null
          payment_status?: "pending" | "completed" | "failed" | "refunded"
          stripe_payment_intent_id?: string | null
          stripe_receipt_url?: string | null
          paypal_order_id?: string | null
          paypal_receipt_url?: string | null
          shipping_address?: Json | null
          tracking_number?: string | null
          carrier?: string | null
          activation_date?: string | null
          notes?: string[] | null
          metadata?: Json | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      order_status: "payment_pending" | "payment_failed" | "processing" | "shipped" | "delivered" | "cancelled"
      order_type: "physical" | "esim"
      payment_method: "stripe" | "paypal"
      payment_status: "pending" | "completed" | "failed" | "refunded"
    }
  }
}