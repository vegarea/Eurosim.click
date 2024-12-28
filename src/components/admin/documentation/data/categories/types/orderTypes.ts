import { ChecklistCategory } from "../../../types/ChecklistTypes";

export const orderTypes: ChecklistCategory = {
  id: "orders",
  category: "Pedidos y Transacciones",
  items: [
    {
      name: "Pedidos",
      status: "pending",
      description: "Tipos encontrados en orders.md y componentes de pedidos",
      locations: [
        "src/components/admin/orders/types.ts",
        "src/components/checkout/types.ts",
        "src/contexts/OrdersContext.tsx"
      ],
      currentTypes: [
        {
          name: "Order",
          path: "src/components/admin/orders/types.ts",
          code: `type Order = {
  id: string
  status: OrderStatus
  customer: string
  total: number
  type: "physical" | "esim"
  paymentMethod?: string
  date: string
  title?: string
  description?: string
  quantity?: number
  passportNumber?: string
  birthDate?: string
  gender?: 'M' | 'F'
  activationDate?: string
  notes?: OrderNote[]
  events?: OrderEvent[]
}`
        },
        {
          name: "OrderStatus",
          path: "src/components/admin/orders/types.ts",
          code: `type OrderStatus = "payment_pending" | "payment_failed" | "processing" | "shipped" | "delivered" | "cancelled"`
        }
      ],
      supabaseTypes: [
        {
          name: "Order",
          path: "src/types/supabase.ts",
          code: `type Order = Database["public"]["Tables"]["orders"]["Row"] = {
  id: string
  customer_id: string
  status: Database["public"]["Enums"]["order_status"]
  type: Database["public"]["Enums"]["order_type"]
  total_amount: number
  payment_method: Database["public"]["Enums"]["payment_method"]
  created_at: string
  updated_at: string | null
  shipping_address_id: string | null
  metadata: Json | null
}`
        }
      ]
    }
  ]
};