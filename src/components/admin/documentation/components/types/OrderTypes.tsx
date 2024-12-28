export const orderTypes = [
  {
    name: "CartItem",
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
    category: "component",
    status: "pending"
  },
  {
    name: "Order",
    currentType: `interface Order {
  id: string
  date: string
  customer: string
  email?: string
  phone?: string
  total: number
  status: OrderStatus
  type: OrderType
  paymentMethod?: "stripe" | "paypal"
  notes?: OrderNote[]
  events?: OrderEvent[]
  title?: string
  description?: string
  quantity?: number
  passportNumber?: string
  birthDate?: string
  gender?: 'M' | 'F'
  activationDate?: string
  shippingAddress?: string
  city?: string
  state?: string
  zipCode?: string
}`,
    supabaseType: `type Order = Database["public"]["Tables"]["orders"]["Row"] = {
  id: string
  customer_id: string
  product_id: string
  status: Database["public"]["Enums"]["order_status"]
  type: Database["public"]["Enums"]["order_type"]
  total_amount: number
  quantity: number
  payment_method: Database["public"]["Enums"]["payment_method"]
  payment_status: Database["public"]["Enums"]["payment_status"]
  shipping_address: Json | null
  tracking_number: string | null
  carrier: string | null
  activation_date: string | null
  notes: string[] | null
  metadata: Json | null
  created_at: string
  updated_at: string | null
}`,
    locations: [
      "src/contexts/OrdersContext.tsx",
      "src/components/admin/orders/types.ts",
      "src/components/checkout/types.ts",
      "src/pages/OrderDetails.tsx"
    ],
    category: "context",
    status: "pending"
  }
]