/**
 * @lovable-protected
 * This file contains types that match Supabase schema exactly.
 * DO NOT MODIFY without explicit user permission.
 */
export type OrderStatus = 
  | "payment_pending"
  | "payment_failed" 
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type OrderType = "physical" | "esim";
export type PaymentMethod = "stripe" | "paypal" | "test";
export type PaymentStatus = "pending" | "completed" | "failed" | "refunded";
export type ProductStatus = "active" | "inactive" | "out_of_stock";
export type ProductType = "physical" | "esim";

// Change from type to enum to use it as a value
export enum CustomerGender {
  M = "M",
  F = "F"
}