import { CustomerGender } from "./enums";
import { Json, MarketingPreferences, ShippingAddress } from "./common";
import { Order } from "./orders";

// Tipo que coincide con la estructura exacta de Supabase
export interface CustomerFromDB {
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

// Tipo con las conversiones para usar en la aplicación
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

export interface ExtendedCustomer extends Customer {
  orders: Order[];
  totalSpent: number;
}

export type CustomerInsert = Omit<CustomerFromDB, "id" | "created_at" | "updated_at">;
export type CustomerUpdate = Partial<CustomerInsert>;

// Funciones auxiliares para convertir entre tipos
export const convertDBCustomerToCustomer = (dbCustomer: CustomerFromDB): Customer => ({
  ...dbCustomer,
  default_shipping_address: dbCustomer.default_shipping_address as ShippingAddress | null,
  billing_address: dbCustomer.billing_address as ShippingAddress | null,
  marketing_preferences: dbCustomer.marketing_preferences as MarketingPreferences | null,
  metadata: dbCustomer.metadata as Record<string, any> | null,
});

export const convertCustomerToDBCustomer = (customer: Partial<Customer>): Partial<CustomerFromDB> => ({
  ...customer,
  default_shipping_address: customer.default_shipping_address as Json,
  billing_address: customer.billing_address as Json,
  marketing_preferences: customer.marketing_preferences as Json,
  metadata: customer.metadata as Json,
});