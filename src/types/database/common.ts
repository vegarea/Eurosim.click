export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  phone: string;
}

export interface MarketingPreferences {
  email_marketing: boolean;
  sms_marketing: boolean;
  push_notifications: boolean;
  language_preference?: string;
  communication_frequency?: string;
}

export interface OrderEvent {
  id: string;
  type: string;
  description: string;
  user_id?: string;
  user_name?: string;
  created_at: string;
  metadata?: Record<string, any>;
}

export interface OrderNote {
  id: string;
  text: string;
  user_id: string;
  user_name: string;
  created_at: string;
}