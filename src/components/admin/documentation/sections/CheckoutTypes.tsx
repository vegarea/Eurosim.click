import { ShoppingCart, Package, ClipboardList, Truck } from "lucide-react"
import { TypeComparisonSection } from "../components/TypeComparisonSection"

export function CheckoutTypes() {
  return (
    <div className="space-y-6">
      <TypeComparisonSection
        title="Pedidos"
        icon={<ClipboardList className="h-5 w-5" />}
        currentType={`type Order = {
  id: string
  status: string
  customer: string
  total: number
  type: string
  paymentMethod?: string
}`}
        supabaseType={`type Database {
  public: {
    Tables: {
      orders: {
        Row: {
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
        }
        Insert: {
          id?: string
          customer_id: string
          status?: Database["public"]["Enums"]["order_status"]
          type: Database["public"]["Enums"]["order_type"]
          total_amount: number
          payment_method?: Database["public"]["Enums"]["payment_method"]
          created_at?: string
          updated_at?: string | null
          shipping_address_id?: string | null
          metadata?: Json | null
        }
        Update: {
          id?: string
          customer_id?: string
          status?: Database["public"]["Enums"]["order_status"]
          type?: Database["public"]["Enums"]["order_type"]
          total_amount?: number
          payment_method?: Database["public"]["Enums"]["payment_method"]
          created_at?: string
          updated_at?: string | null
          shipping_address_id?: string | null
          metadata?: Json | null
        }
      }
    }
    Enums: {
      order_status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
      order_type: "physical" | "esim"
      payment_method: "card" | "cash" | "transfer"
    }
  }
}`}
        status="reviewed"
        relatedFiles={[
          "src/components/admin/orders/types.ts",
          "src/components/checkout/types.ts"
        ]}
      />

      <TypeComparisonSection
        title="Items de Pedido"
        icon={<Package className="h-5 w-5" />}
        currentType={`type OrderItem = {
  id: string
  quantity: number
  price: number
  productId: string
}`}
        supabaseType={`type Database {
  public: {
    Tables: {
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          quantity: number
          unit_price: number
          total_price: number
          created_at: string
          metadata: Json | null
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          quantity: number
          unit_price: number
          total_price: number
          created_at?: string
          metadata?: Json | null
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          unit_price?: number
          total_price?: number
          created_at?: string
          metadata?: Json | null
        }
      }
    }
  }
}`}
        status="reviewed"
        relatedFiles={[
          "src/components/admin/orders/types.ts",
          "src/components/checkout/CartItem.tsx"
        ]}
      />

      <TypeComparisonSection
        title="Información de Envío"
        icon={<Truck className="h-5 w-5" />}
        currentType={`type ShippingInfo = {
  address: string
  city: string
  state: string
  zipCode: string
  carrier?: string
  trackingNumber?: string
}`}
        supabaseType={`type Database {
  public: {
    Tables: {
      shipping_addresses: {
        Row: {
          id: string
          customer_id: string
          address_line1: string
          address_line2: string | null
          city: string
          state: string
          postal_code: string
          country: string
          is_default: boolean
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          customer_id: string
          address_line1: string
          address_line2?: string | null
          city: string
          state: string
          postal_code: string
          country: string
          is_default?: boolean
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          customer_id?: string
          address_line1?: string
          address_line2?: string | null
          city?: string
          state?: string
          postal_code?: string
          country?: string
          is_default?: boolean
          created_at?: string
          updated_at?: string | null
        }
      }
      shipping_tracking: {
        Row: {
          id: string
          order_id: string
          carrier: Database["public"]["Enums"]["shipping_carrier"]
          tracking_number: string
          status: Database["public"]["Enums"]["shipping_status"]
          estimated_delivery: string | null
          created_at: string
          updated_at: string | null
          metadata: Json | null
        }
        Insert: {
          id?: string
          order_id: string
          carrier: Database["public"]["Enums"]["shipping_carrier"]
          tracking_number: string
          status?: Database["public"]["Enums"]["shipping_status"]
          estimated_delivery?: string | null
          created_at?: string
          updated_at?: string | null
          metadata?: Json | null
        }
        Update: {
          id?: string
          order_id?: string
          carrier?: Database["public"]["Enums"]["shipping_carrier"]
          tracking_number?: string
          status?: Database["public"]["Enums"]["shipping_status"]
          estimated_delivery?: string | null
          created_at?: string
          updated_at?: string | null
          metadata?: Json | null
        }
      }
    }
    Enums: {
      shipping_carrier: "fedex" | "dhl" | "ups" | "estafeta" | "redpack"
      shipping_status: "pending" | "in_transit" | "delivered" | "failed" | "returned"
    }
  }
}`}
        status="reviewed"
        relatedFiles={[
          "src/components/admin/shipping/types.ts",
          "src/components/checkout/ShippingForm.tsx"
        ]}
      />
    </div>
  )
}