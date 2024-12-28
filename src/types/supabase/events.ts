import { Database } from "@/integrations/supabase/types";

export type OrderEvent = Database['public']['Tables']['order_events']['Row'];
export type OrderEventInsert = Database['public']['Tables']['order_events']['Insert'];
export type OrderEventUpdate = Database['public']['Tables']['order_events']['Update'];

export type OrderNote = Database['public']['Tables']['order_notes']['Row'];
export type OrderNoteInsert = Database['public']['Tables']['order_notes']['Insert'];
export type OrderNoteUpdate = Database['public']['Tables']['order_notes']['Update'];