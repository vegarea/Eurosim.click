import { Database } from "@/integrations/supabase/types";

export type Product = Database['public']['Tables']['products']['Row'];
export type ProductInsert = Database['public']['Tables']['products']['Insert'];
export type ProductUpdate = Database['public']['Tables']['products']['Update'];

export type ProductStatus = 'active' | 'inactive';