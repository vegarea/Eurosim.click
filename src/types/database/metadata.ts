import { Json } from "./common";

export interface OrderMetadata {
  customerInfo?: {
    name: string;
    email: string;
    phone?: string;
  };
  events?: Array<{
    id: string;
    type: string;
    description: string;
    created_at: string;
    metadata?: Record<string, any>;
  }>;
  product_title?: string;
  product_data_eu?: number;
  product_data_es?: number;
  [key: string]: Json | undefined;
}