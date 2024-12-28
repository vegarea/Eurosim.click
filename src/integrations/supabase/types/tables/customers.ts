import type { Json } from '../base'
import type { TableDefaults } from './base-table'

export interface CustomersTable extends TableDefaults {
  Row: {
    billing_address: Json | null
    birth_date: string | null
    created_at: string | null
    default_shipping_address: Json | null
    email: string
    gender: string | null
    id: string
    marketing_preferences: Json | null
    metadata: Json | null
    name: string
    passport_number: string | null
    paypal_customer_id: string | null
    phone: string | null
    preferred_language: string | null
    stripe_customer_id: string | null
    updated_at: string | null
  }
  Insert: {
    billing_address?: Json | null
    birth_date?: string | null
    created_at?: string | null
    default_shipping_address?: Json | null
    email: string
    gender?: string | null
    id?: string
    marketing_preferences?: Json | null
    metadata?: Json | null
    name: string
    passport_number?: string | null
    paypal_customer_id?: string | null
    phone?: string | null
    preferred_language?: string | null
    stripe_customer_id?: string | null
    updated_at?: string | null
  }
  Update: {
    billing_address?: Json | null
    birth_date?: string | null
    created_at?: string | null
    default_shipping_address?: Json | null
    email?: string
    gender?: string | null
    id?: string
    marketing_preferences?: Json | null
    metadata?: Json | null
    name?: string
    passport_number?: string | null
    paypal_customer_id?: string | null
    phone?: string | null
    preferred_language?: string | null
    stripe_customer_id?: string | null
    updated_at?: string | null
  }
  Relationships: []
}