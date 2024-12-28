import { Database } from "@/integrations/supabase/types";

export type Customer = Database['public']['Tables']['customers']['Row'];
export type CustomerInsert = Database['public']['Tables']['customers']['Insert'];
export type CustomerUpdate = Database['public']['Tables']['customers']['Update'];

export type Gender = 'M' | 'F';

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  phone?: string;
}

export interface MarketingPreferences {
  email_marketing: boolean;
  sms_marketing: boolean;
  push_notifications: boolean;
  language_preference: string;
  communication_frequency: string;
}