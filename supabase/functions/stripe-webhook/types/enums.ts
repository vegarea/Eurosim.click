// Estos tipos deben coincidir EXACTAMENTE con los ENUM de la base de datos
export type CustomerGender = "M" | "F";
export type OrderStatus = "payment_pending" | "payment_failed" | "processing" | "shipped" | "delivered" | "cancelled";
export type OrderType = "physical" | "esim";
export type PaymentMethod = "stripe" | "paypal" | "test";
export type PaymentStatus = "pending" | "completed" | "failed" | "refunded";