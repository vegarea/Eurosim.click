export const orderTypes = [
  {
    name: "CartItem",
    description: "Tipo para los items del carrito de compras",
    currentType: `interface CartItem {
  id: string
  type: "physical" | "esim"
  title: string
  description: string
  price: number
  quantity: number
}`,
    supabaseType: `type CartItem = Database["public"]["Tables"]["cart_items"]["Row"] = {
  id: string
  product_id: string
  quantity: number
  created_at: string
  updated_at: string | null
  metadata: Json | null
}`,
    locations: [
      "src/contexts/CartContext.tsx",
      "src/components/cart/Cart.tsx",
      "src/components/cart/CartItem.tsx"
    ],
    relations: [
      {
        type: "many_to_one",
        with: "Product",
        description: "Cada item del carrito pertenece a un producto"
      }
    ],
    requiredFields: [
      "product_id",
      "quantity"
    ],
    category: "component",
    status: "pending"
  },
  {
    name: "Order",
    description: "Tipo para los pedidos realizados",
    currentType: `interface Order {
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
}`,
    supabaseType: `type Order = Database["public"]["Tables"]["orders"]["Row"] = {
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
}`,
    locations: [
      "src/components/admin/orders/types.ts",
      "src/components/checkout/types.ts",
      "src/contexts/OrdersContext.tsx",
      "src/pages/OrderDetails.tsx"
    ],
    relations: [
      {
        type: "one_to_many",
        with: "CartItem",
        description: "Un pedido puede tener múltiples items del carrito"
      }
    ],
    requiredFields: [
      "customer_id",
      "total_amount",
      "status",
      "type"
    ],
    category: "context",
    status: "pending"
  }
]
