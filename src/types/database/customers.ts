import { CustomerGender } from "./enums";
import { Json } from "./common";
import { Order } from "./orders";

// Tipo que coincide exactamente con la estructura de Supabase
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  passport_number: string | null;
  birth_date: string | null;
  gender: CustomerGender | null;
  default_shipping_address: Json | null;
  billing_address: Json | null;
  preferred_language: string | null;
  marketing_preferences: Json | null;
  stripe_customer_id: string | null;
  paypal_customer_id: string | null;
  metadata: Json | null;
  created_at: string | null;
  updated_at: string | null;
}

// Tipo extendido para incluir información calculada en el frontend
export interface ExtendedCustomer extends Customer {
  orders: Order[];
  totalSpent: number;
}

export type CustomerInsert = Omit<Customer, "id" | "created_at" | "updated_at">;
export type CustomerUpdate = Partial<CustomerInsert>;