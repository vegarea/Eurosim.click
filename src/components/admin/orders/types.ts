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
  total: number
  status: OrderStatus
  type: OrderType
  paymentMethod?: "stripe" | "paypal"
}