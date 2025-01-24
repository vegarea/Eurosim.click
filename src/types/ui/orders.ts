import { Database } from "@/integrations/supabase/types";

export type DbOrder = Database["public"]["Tables"]["orders"]["Row"];
export type DbCustomer = Database["public"]["Tables"]["customers"]["Row"];
export type DbOrderItem = Database["public"]["Tables"]["order_items"]["Row"];

export type OrderWithRelations = DbOrder & {
  customer: Pick<DbCustomer, "name" | "email" | "phone"> | null;
  items: DbOrderItem[] | null;
};