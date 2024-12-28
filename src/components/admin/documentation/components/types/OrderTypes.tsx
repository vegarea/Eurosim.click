export const orderTypes = [
  {
    name: "Order",
    description: "Tipo principal para pedidos",
    currentType: `interface Order {
  id: string;
  customer_id: string;
  product_id: string;
  status: OrderStatus;
  type: OrderType;
  total_amount: number;
  quantity: number;
  payment_method?: PaymentMethod;
  payment_status: PaymentStatus;
  shipping_address?: ShippingAddress;
  tracking_number?: string;
  carrier?: string;
  activation_date?: string;
  notes?: string[];
  metadata?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}`,
    supabaseType: `type Order = Database["public"]["Tables"]["orders"]["Row"]`,
    locations: [
      "src/types/database/orders.ts",
      "src/components/admin/orders/types.ts"
    ],
    relations: [
      {
        type: "one_to_many",
        with: "OrderItem",
        description: "Un pedido puede tener múltiples items"
      }
    ],
    requiredFields: [
      "customer_id",
      "product_id",
      "status",
      "type",
      "total_amount",
      "quantity"
    ],
    category: "context",
    status: "updated"
  },
  {
    name: "OrderItem",
    description: "Tipo para items individuales de un pedido",
    currentType: `interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  metadata?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}`,
    supabaseType: `type OrderItem = Database["public"]["Tables"]["order_items"]["Row"]`,
    locations: [
      "src/types/database/orderItems.ts"
    ],
    relations: [
      {
        type: "many_to_one",
        with: "Order",
        description: "Cada item pertenece a un pedido"
      }
    ],
    requiredFields: [
      "order_id",
      "product_id",
      "quantity",
      "unit_price",
      "total_price"
    ],
    category: "component",
    status: "updated"
  }
];