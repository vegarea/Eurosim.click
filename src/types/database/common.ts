export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface OrderMetadata {
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  events?: OrderEvent[];
  notes?: string[];
  [key: string]: any;
}

export interface OrderEvent {
  id: string;
  type: string;
  description: string;
  created_at: string;
  metadata?: Record<string, any>;
}

// Note: Esta interfaz es solo para UI, no para almacenamiento
export interface UIOrderNote {
  id: string;
  text: string;
  user_id: string;
  user_name: string;
  created_at: string;
}