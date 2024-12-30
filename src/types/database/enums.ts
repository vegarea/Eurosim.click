export enum OrderStatus {
  payment_pending = "payment_pending",
  payment_failed = "payment_failed",
  processing = "processing",
  shipped = "shipped",
  delivered = "delivered",
  cancelled = "cancelled"
}

export enum OrderType {
  physical = "physical",
  esim = "esim"
}

export enum PaymentMethod {
  stripe = "stripe",
  paypal = "paypal",
  test = "test"
}

export enum PaymentStatus {
  pending = "pending",
  completed = "completed",
  failed = "failed",
  refunded = "refunded"
}

export enum ProductStatus {
  active = "active",
  inactive = "inactive",
  out_of_stock = "out_of_stock"
}

export enum ProductType {
  physical = "physical",
  esim = "esim"
}

export enum CustomerGender {
  M = "M",
  F = "F"
}