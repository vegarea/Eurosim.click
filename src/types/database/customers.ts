export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  passport_number?: string | null;
  birth_date?: string | null;
  gender?: 'M' | 'F' | null;
  default_shipping_address?: {
    street: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
    phone: string;
  } | null;
  billing_address?: {
    street: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
    phone: string;
  } | null;
  preferred_language?: string;
  marketing_preferences?: {
    email_marketing: boolean;
    sms_marketing: boolean;
    push_notifications: boolean;
  };
  stripe_customer_id?: string | null;
  paypal_customer_id?: string | null;
  metadata?: Record<string, any> | null;
  created_at?: string;
  updated_at?: string;
}

export type CustomerInsert = Omit<Customer, "id" | "created_at" | "updated_at">;
export type CustomerUpdate = Partial<CustomerInsert>;