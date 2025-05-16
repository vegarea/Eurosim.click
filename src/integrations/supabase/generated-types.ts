
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
      customers: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          passport_number: string | null
          birth_date: string | null
          gender: "M" | "F" | null
          default_shipping_address: Json | null
          billing_address: Json | null
          preferred_language: string | null
          marketing_preferences: Json | null
          stripe_customer_id: string | null
          paypal_customer_id: string | null
          metadata: Json | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          passport_number?: string | null
          birth_date?: string | null
          gender?: "M" | "F" | null
          default_shipping_address?: Json | null
          billing_address?: Json | null
          preferred_language?: string | null
          marketing_preferences?: Json | null
          stripe_customer_id?: string | null
          paypal_customer_id?: string | null
          metadata?: Json | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          passport_number?: string | null
          birth_date?: string | null
          gender?: "M" | "F" | null
          default_shipping_address?: Json | null
          billing_address?: Json | null
          preferred_language?: string | null
          marketing_preferences?: Json | null
          stripe_customer_id?: string | null
          paypal_customer_id?: string | null
          metadata?: Json | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          quantity: number
          unit_price: number
          total_price: number
          metadata: Json | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          quantity?: number
          unit_price: number
          total_price: number
          metadata?: Json | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          unit_price?: number
          total_price?: number
          metadata?: Json | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      airalo_settings: {
        Row: {
          id: string
          is_active: boolean
          api_key: string
          api_secret: string
          api_url: string
          webhook_url: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          is_active?: boolean
          api_key: string
          api_secret: string
          api_url?: string
          webhook_url?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          is_active?: boolean
          api_key?: string
          api_secret?: string
          api_url?: string
          webhook_url?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      airalo_webhook_logs: {
        Row: {
          id: string
          event_type: string
          payload: Json
          received_at: string
          processed_at: string | null
          is_processed: boolean | null
          notes: string | null
        }
        Insert: {
          id?: string
          event_type: string
          payload: Json
          received_at: string
          processed_at?: string | null
          is_processed?: boolean | null
          notes?: string | null
        }
        Update: {
          id?: string
          event_type?: string
          payload?: Json
          received_at?: string
          processed_at?: string | null
          is_processed?: boolean | null
          notes?: string | null
        }
      }
      orders: {
        Row: {
          id: string
          customer_id: string
          product_id: string
          status: Database["public"]["Enums"]["order_status"]
          type: Database["public"]["Enums"]["order_type"]
          total_amount: number
          quantity: number
          payment_method: Database["public"]["Enums"]["payment_method"] | null
          payment_status: Database["public"]["Enums"]["payment_status"]
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
          status?: Database["public"]["Enums"]["order_status"]
          type: Database["public"]["Enums"]["order_type"]
          total_amount: number
          quantity?: number
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          payment_status?: Database["public"]["Enums"]["payment_status"]
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
          status?: Database["public"]["Enums"]["order_status"]
          type?: Database["public"]["Enums"]["order_type"]
          total_amount?: number
          quantity?: number
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          payment_status?: Database["public"]["Enums"]["payment_status"]
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
