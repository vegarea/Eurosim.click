export type OrderStatus = 
  | "payment_pending"
  | "payment_failed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type OrderType = "physical" | "esim";

export type PaymentMethod = "stripe" | "paypal";

export type PaymentStatus = "pending" | "completed" | "failed" | "refunded";

export type CustomerGender = "M" | "F";