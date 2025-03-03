
import { Database } from "@/integrations/supabase/types";
import { ShippingAddress } from "@/types/database/common";
import { Customer } from "@/types/database/customers";

// Simple types with minimal properties and no complex relationships
export interface BasicOrderInfo {
  id: string;
  status: string;
  total_amount: number;
  created_at: string | null;
  payment_method: string | null;
  payment_status: string;
}

export interface BasicCustomerInfo {
  name: string | null;
  email: string | null;
}

export interface BasicOrderItem {
  quantity: number;
  unit_price: number;
  product_title: string;
}

// Add the missing types that are required by the components
export interface ThankYouOrder {
  id: string;
  status: string;
  type: 'digital' | 'physical';
  total_amount: number;
  created_at: string | null;
  shipping_address: ShippingAddress | null;
  customer?: {
    name: string | null;
    email: string | null;
  };
}

export interface ThankYouOrderItem {
  id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  metadata: {
    product_title?: string;
  } | null;
}
