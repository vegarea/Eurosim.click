import { CustomerGender } from "./enums";
import { Json, MarketingPreferences, ShippingAddress } from "./common";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  passport_number: string | null;
  birth_date: string | null;
  gender: CustomerGender | null;
  default_shipping_address: ShippingAddress | null;
  billing_address: ShippingAddress | null;
  preferred_language: string | null;
  marketing_preferences: MarketingPreferences | null;
  stripe_customer_id: string | null;
  paypal_customer_id: string | null;
  metadata: Record<string, any> | null;
  created_at: string | null;
  updated_at: string | null;
}

export type CustomerInsert = Omit<Customer, "id" | "created_at" | "updated_at">;
export type CustomerUpdate = Partial<CustomerInsert>;