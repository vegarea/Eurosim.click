import { ChecklistCategory } from "../types/ChecklistTypes"

export const checkoutTypes: ChecklistCategory = {
  id: "checkout",
  category: "Checkout y Pedidos",
  items: [
    {
      name: "CartItem",
      status: "pending",
      description: "Tipos encontrados en CartContext y componentes del carrito",
      locations: [
        "src/contexts/CartContext.tsx",
        "src/components/cart/Cart.tsx",
        "src/components/cart/CartItem.tsx"
      ],
      currentTypes: [
        {
          name: "CartItem",
          path: "src/contexts/CartContext.tsx",
          code: `interface CartItem {
  id: string
  type: "physical" | "esim"
  title: string
  description: string
  price: number
  quantity: number
}`
        }
      ],
      supabaseTypes: [
        {
          name: "CartItem",
          path: "src/types/supabase.ts",
          code: `type CartItem = Database["public"]["Tables"]["cart_items"]["Row"]`
        }
      ]
    },
    {
      name: "Order",
      status: "pending",
      description: "Tipos encontrados en OrdersContext y componentes de pedidos",
      locations: [
        "src/contexts/OrdersContext.tsx",
        "src/components/admin/orders/types.ts",
        "src/components/admin/orders/OrderDetails.tsx",
        "src/pages/OrderDetails.tsx"
      ],
      currentTypes: [
        {
          name: "Order",
          path: "src/components/admin/orders/types.ts",
          code: `interface Order {
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
}`
        }
      ],
      supabaseTypes: [
        {
          name: "Order",
          path: "src/types/supabase.ts",
          code: `type Order = Database["public"]["Tables"]["orders"]["Row"]`
        }
      ]
    },
    {
      name: "DocumentationFormData",
      status: "pending",
      description: "Tipos para el formulario de documentación UE",
      locations: [
        "src/components/checkout/DocumentationForm.tsx"
      ],
      currentTypes: [
        {
          name: "DocumentationFormData",
          path: "src/components/checkout/DocumentationForm.tsx",
          code: `interface DocumentationFormData {
  fullName: string
  birthDate: Date
  gender: string
  passportNumber: string
  activationDate: Date
}`
        }
      ],
      supabaseTypes: [
        {
          name: "CustomerDocument",
          path: "src/types/supabase.ts",
          code: `type CustomerDocument = Database["public"]["Tables"]["customer_documents"]["Row"]`
        }
      ]
    },
    {
      name: "ShippingFormData",
      status: "pending",
      description: "Tipos para el formulario de envío",
      locations: [
        "src/components/checkout/ShippingForm.tsx"
      ],
      currentTypes: [
        {
          name: "ShippingFormData",
          path: "src/components/checkout/ShippingForm.tsx",
          code: `interface ShippingFormData {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
}`
        }
      ],
      supabaseTypes: [
        {
          name: "ShippingAddress",
          path: "src/types/supabase.ts",
          code: `type ShippingAddress = Database["public"]["Tables"]["shipping_addresses"]["Row"]`
        }
      ]
    }
  ]
}