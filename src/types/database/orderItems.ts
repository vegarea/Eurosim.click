export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  metadata?: Record<string, any> | null;
  created_at?: string;
  updated_at?: string;
}

export type OrderItemInsert = Omit<OrderItem, "id" | "created_at" | "updated_at">;
export type OrderItemUpdate = Partial<OrderItemInsert>;