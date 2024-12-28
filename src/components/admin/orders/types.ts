import { Database } from "@/integrations/supabase/types";

export type Order = Database["public"]["Tables"]["orders"]["Row"] & {
  // Campos adicionales para UI que no están en la base de datos
  customer_name?: string;
  product_title?: string;
  product_description?: string;
};

export type OrderEvent = {
  id: string;
  type: string;
  description: string;
  user_id?: string;
  user_name?: string;
  created_at: string;
  metadata?: Record<string, any>;
};

export type OrderNote = {
  id: string;
  text: string;
  user_id: string;
  user_name: string;
  created_at: string;
};