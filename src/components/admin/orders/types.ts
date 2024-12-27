export type OrderStatus = 
  | "payment_pending"
  | "payment_failed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"

export type OrderType = "physical" | "esim"

export interface Order {
  id: string
  date: string
  customer: string
  email?: string
  phone?: string
  total: number
  status: OrderStatus
  type: OrderType
  paymentMethod?: "stripe" | "paypal"
  
  // Detalles del producto
  title?: string
  description?: string
  quantity?: number

  // Documentación UE
  passportNumber?: string
  birthDate?: string
  gender?: 'M' | 'F'
  activationDate?: string

  // Información de envío (solo para SIM física)
  shippingAddress?: string
  city?: string
  state?: string
  zipCode?: string
}