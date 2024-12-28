export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// Tipos exactos de Supabase (snake_case)
export interface SupabaseOrder {
  id: string;
  customer_id: string;
  product_id: string;
  status: string;
  type: string;
  total_amount: number;
  quantity: number;
  payment_method: string | null;
  payment_status: string;
  shipping_address: Json | null;
  tracking_number: string | null;
  carrier: string | null;
  activation_date: string | null;
  notes: Json[] | null;
  events: Json[] | null;
  metadata: Json | null;
  created_at: string | null;
  updated_at: string | null;
}

// Tipos para la UI (camelCase)
export interface UIOrder {
  id: string;
  customerId: string;
  productId: string;
  status: string;
  type: string;
  total: number;
  quantity: number;
  paymentMethod: string | null;
  paymentStatus: string;
  shippingAddress: any | null;
  trackingNumber: string | null;
  carrier: string | null;
  activationDate: string | null;
  notes: any[] | null;
  events: any[] | null;
  metadata: any | null;
  createdAt: string | null;
  updatedAt: string | null;
  // Campos calculados/transformados
  customerName?: string;
  formattedDate?: string;
}

// Funciones de transformación
export function transformToUIOrder(order: SupabaseOrder): UIOrder {
  return {
    id: order.id,
    customerId: order.customer_id,
    productId: order.product_id,
    status: order.status,
    type: order.type,
    total: order.total_amount / 100,
    quantity: order.quantity,
    paymentMethod: order.payment_method,
    paymentStatus: order.payment_status,
    shippingAddress: order.shipping_address,
    trackingNumber: order.tracking_number,
    carrier: order.carrier,
    activationDate: order.activation_date,
    notes: order.notes,
    events: order.events,
    metadata: order.metadata,
    createdAt: order.created_at,
    updatedAt: order.updated_at,
    formattedDate: order.created_at ? new Date(order.created_at).toLocaleDateString() : '',
  };
}

export function transformToSupabaseOrder(order: UIOrder): Partial<SupabaseOrder> {
  return {
    customer_id: order.customerId,
    product_id: order.productId,
    status: order.status,
    type: order.type,
    total_amount: Math.round(order.total * 100),
    quantity: order.quantity,
    payment_method: order.paymentMethod,
    payment_status: order.paymentStatus,
    shipping_address: order.shippingAddress,
    tracking_number: order.trackingNumber,
    carrier: order.carrier,
    activation_date: order.activationDate,
    notes: order.notes,
    events: order.events,
    metadata: order.metadata,
  };
}