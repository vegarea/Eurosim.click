import { Database } from "@/integrations/supabase/types"

// Tipos exactos de Supabase
export type SupabaseOrder = Database['public']['Tables']['orders']['Row']
export type SupabaseCustomer = Database['public']['Tables']['customers']['Row']
export type SupabaseProduct = Database['public']['Tables']['products']['Row']
export type SupabaseOrderEvent = Database['public']['Tables']['order_events']['Row']
export type SupabaseOrderNote = Database['public']['Tables']['order_notes']['Row']

// Tipos para la UI
export interface UIOrder {
  id: string
  customerId: string
  productId: string
  status: OrderStatus
  type: OrderType
  total: number
  quantity: number
  paymentMethod: PaymentMethod
  paymentStatus: PaymentStatus
  shippingAddress: ShippingAddress | null
  trackingNumber: string | null
  carrier: string | null
  activationDate: string | null
  notes: OrderNote[] | null
  events: OrderEvent[] | null
  metadata: Record<string, any> | null
  createdAt: string
  updatedAt: string
  // Campos calculados/relacionados
  customer?: {
    name: string
    email: string | null
    phone: string | null
  }
  product?: {
    title: string
    description: string
  }
}

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

export interface ShippingAddress {
  street: string
  city: string
  state: string
  country: string
  postalCode: string
  phone?: string
}

export interface OrderEvent {
  id: string
  orderId: string
  type: string
  description: string
  userId: string | null
  metadata: Record<string, any> | null
  createdAt: string
}

export interface OrderNote {
  id: string
  orderId: string
  text: string
  userId: string
  createdAt: string
}

// Funciones de transformación
export function transformToUIOrder(order: SupabaseOrder & {
  customers?: { name: string; email: string | null; phone: string | null };
  products?: { title: string; description: string };
}): UIOrder {
  return {
    id: order.id,
    customerId: order.customer_id,
    productId: order.product_id,
    status: order.status as OrderStatus,
    type: order.type as OrderType,
    total: order.total_amount / 100,
    quantity: order.quantity,
    paymentMethod: (order.payment_method || 'stripe') as PaymentMethod,
    paymentStatus: order.payment_status as PaymentStatus,
    shippingAddress: order.shipping_address as ShippingAddress,
    trackingNumber: order.tracking_number,
    carrier: order.carrier,
    activationDate: order.activation_date,
    notes: order.notes?.map(note => ({
      id: (note as any).id,
      orderId: order.id,
      text: (note as any).text,
      userId: (note as any).user_id,
      createdAt: (note as any).created_at
    })) || [],
    events: order.events?.map(event => ({
      id: (event as any).id,
      orderId: order.id,
      type: (event as any).type,
      description: (event as any).description,
      userId: (event as any).user_id,
      metadata: (event as any).metadata,
      createdAt: (event as any).created_at
    })) || [],
    metadata: order.metadata,
    createdAt: order.created_at || new Date().toISOString(),
    updatedAt: order.updated_at || new Date().toISOString(),
    customer: order.customers,
    product: order.products
  }
}

export function transformToSupabaseOrder(order: Partial<UIOrder>): Partial<SupabaseOrder> {
  return {
    customer_id: order.customerId,
    product_id: order.productId,
    status: order.status,
    type: order.type,
    total_amount: order.total ? Math.round(order.total * 100) : undefined,
    quantity: order.quantity,
    payment_method: order.paymentMethod,
    payment_status: order.paymentStatus,
    shipping_address: order.shippingAddress,
    tracking_number: order.trackingNumber,
    carrier: order.carrier,
    activation_date: order.activationDate,
    notes: order.notes?.map(note => ({
      id: note.id,
      text: note.text,
      user_id: note.userId,
      created_at: note.createdAt
    })),
    events: order.events?.map(event => ({
      id: event.id,
      type: event.type,
      description: event.description,
      user_id: event.userId,
      metadata: event.metadata,
      created_at: event.createdAt
    })),
    metadata: order.metadata
  }
}