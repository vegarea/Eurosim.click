import { Database } from "@/integrations/supabase/types"

// Tipos base de Supabase
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]

// Tipos principales
export type Customer = Tables<'customers'>
export type Order = Tables<'orders'>
export type Product = Tables<'products'>
export type Payment = Tables<'payments'>
export type OrderEvent = Tables<'order_events'>
export type OrderNote = Tables<'order_notes'>

// Enums
export type OrderStatus = 
  | 'payment_pending'
  | 'payment_failed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'

export type OrderType = 'physical' | 'esim'
export type PaymentMethod = 'stripe' | 'paypal'
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded'
export type ProductStatus = 'active' | 'inactive'
export type Gender = 'M' | 'F'

// Interfaces para estructuras JSON
export interface ShippingAddress {
  street: string
  city: string
  state: string
  country: string
  postalCode: string
  phone?: string
  fullName: string
  email: string
}

export interface MarketingPreferences {
  emailNotifications: boolean
  smsNotifications: boolean
  promotionalEmails: boolean
}

export interface OrderEventMetadata {
  oldStatus?: OrderStatus
  newStatus?: OrderStatus
  paymentMethod?: PaymentMethod
  automated?: boolean
  trackingNumber?: string
  carrier?: string
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
  postalCode: string
  country: string
}