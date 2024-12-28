import { Json } from './base'

interface TableDefaults {
  Row: Record<string, unknown>
  Insert: Record<string, unknown>
  Update: Record<string, unknown>
  Relationships: Array<{
    foreignKeyName: string
    columns: string[]
    isOneToOne: boolean
    referencedRelation: string
    referencedColumns: string[]
  }>
}

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

export interface OrderEventsTable extends TableDefaults {
  Row: {
    created_at: string | null
    description: string
    id: string
    metadata: Json | null
    order_id: string
    type: string
    user_id: string | null
  }
  Insert: {
    created_at?: string | null
    description: string
    id?: string
    metadata?: Json | null
    order_id: string
    type: string
    user_id?: string | null
  }
  Update: {
    created_at?: string | null
    description?: string
    id?: string
    metadata?: Json | null
    order_id?: string
    type?: string
    user_id?: string | null
  }
  Relationships: [
    {
      foreignKeyName: "order_events_order_id_fkey"
      columns: ["order_id"]
      isOneToOne: false
      referencedRelation: "orders"
      referencedColumns: ["id"]
    }
  ]
}

export interface OrderNotesTable extends TableDefaults {
  Row: {
    created_at: string | null
    id: string
    order_id: string
    text: string
    user_id: string
  }
  Insert: {
    created_at?: string | null
    id?: string
    order_id: string
    text: string
    user_id: string
  }
  Update: {
    created_at?: string | null
    id?: string
    order_id?: string
    text?: string
    user_id?: string
  }
  Relationships: [
    {
      foreignKeyName: "order_notes_order_id_fkey"
      columns: ["order_id"]
      isOneToOne: false
      referencedRelation: "orders"
      referencedColumns: ["id"]
    }
  ]
}

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

export interface ProductsTable extends TableDefaults {
  Row: {
    created_at: string | null
    description: string
    europe_gb: number | null
    features: string[]
    id: string
    metadata: Json | null
    price: number
    spain_gb: number | null
    status: string
    stock: number | null
    title: string
    type: string
    updated_at: string | null
  }
  Insert: {
    created_at?: string | null
    description: string
    europe_gb?: number | null
    features?: string[]
    id?: string
    metadata?: Json | null
    price: number
    spain_gb?: number | null
    status?: string
    stock?: number | null
    title: string
    type: string
    updated_at?: string | null
  }
  Update: {
    created_at?: string | null
    description?: string
    europe_gb?: number | null
    features?: string[]
    id?: string
    metadata?: Json | null
    price?: number
    spain_gb?: number | null
    status?: string
    stock?: number | null
    title?: string
    type?: string
    updated_at?: string | null
  }
  Relationships: []
}