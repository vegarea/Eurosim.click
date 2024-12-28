import { Json } from "@/integrations/supabase/types"

// Tipos base de Supabase
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']

// Enums
export type OrderStatus = 
  | "payment_pending"
  | "payment_failed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"

export type OrderType = "physical" | "esim"
export type PaymentMethod = "stripe" | "paypal"
export type PaymentStatus = "pending" | "completed" | "failed" | "refunded"
export type ProductStatus = "active" | "inactive"
export type Gender = "M" | "F"

// Interfaces para estructuras JSON
export interface ShippingAddress {
  street: string
  city: string
  state: string
  country: string
  postal_code: string
  phone?: string
}

export interface MarketingPreferences {
  email_marketing: boolean
  sms_marketing: boolean
  push_notifications: boolean
  language_preference: string
  communication_frequency: string
}

// Tipos principales alineados con Supabase
export interface Customer {
  id: string
  name: string
  email: string
  phone: string | null
  passport_number: string | null
  birth_date: string | null
  gender: Gender | null
  default_shipping_address: ShippingAddress | null
  billing_address: ShippingAddress | null
  preferred_language: string | null
  marketing_preferences: MarketingPreferences | null
  stripe_customer_id: string | null
  paypal_customer_id: string | null
  metadata: Json | null
  created_at: string | null
  updated_at: string | null
}

export interface Order {
  id: string
  customer_id: string
  product_id: string
  status: OrderStatus
  type: OrderType
  total_amount: number
  quantity: number
  payment_method: PaymentMethod | null
  payment_status: PaymentStatus
  stripe_payment_intent_id: string | null
  stripe_receipt_url: string | null
  paypal_order_id: string | null
  paypal_receipt_url: string | null
  shipping_address: ShippingAddress | null
  tracking_number: string | null
  carrier: string | null
  activation_date: string | null
  notes: string[] | null
  metadata: Json | null
  created_at: string | null
  updated_at: string | null
}

export interface Product {
  id: string
  type: OrderType
  title: string
  description: string
  price: number
  features: string[]
  europe_gb: number | null
  spain_gb: number | null
  status: ProductStatus
  stock: number | null
  metadata: Json | null
  created_at: string | null
  updated_at: string | null
}

export interface OrderEvent {
  id: string
  order_id: string
  type: string
  description: string
  user_id: string | null
  metadata: Json | null
  created_at: string | null
}

export interface OrderNote {
  id: string
  order_id: string
  text: string
  user_id: string
  created_at: string | null
}

export interface Payment {
  id: string
  order_id: string
  amount: number
  currency: string
  status: PaymentStatus
  payment_method_id: string
  provider_payment_id: string
  provider_receipt_url: string | null
  metadata: Json | null
  created_at: string | null
  updated_at: string | null
}

// Tipos para formularios
export interface DocumentValidationForm {
  fullName: string
  birthDate: Date
  gender: Gender
  passportNumber: string
  activationDate: Date
  email?: string
  phone?: string
}

export interface ShippingAddressForm {
  fullName: string
  email: string
  phone: string
  street: string
  city: string
  state: string
  postal_code: string
  country: string
}