import { Package, ClipboardList, Users, Truck } from "lucide-react"
import { TypeComparisonSection } from "../components/TypeComparisonSection"

export function AdminTypes() {
  return (
    <div className="space-y-6">
      <TypeComparisonSection
        title="Gestión de Productos"
        icon={<Package className="h-5 w-5" />}
        currentType={`type Product = {
  id: string
  title: string
  price: number
  type: string
}`}
        supabaseType={`type Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          title: string
          description: string | null
          price: number
          type: Database["public"]["Enums"]["product_type"]
          status: Database["public"]["Enums"]["product_status"]
          stock: number | null
          metadata: Json | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          price: number
          type: Database["public"]["Enums"]["product_type"]
          status?: Database["public"]["Enums"]["product_status"]
          stock?: number | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          price?: number
          type?: Database["public"]["Enums"]["product_type"]
          status?: Database["public"]["Enums"]["product_status"]
          stock?: number | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string | null
        }
      }
    }
    Enums: {
      product_type: "physical" | "esim"
      product_status: "draft" | "active" | "inactive"
    }
  }
}`}
        status="reviewed"
        relatedFiles={[
          "src/components/admin/products/types.ts",
          "src/components/admin/products/ProductCard.tsx"
        ]}
      />

      <TypeComparisonSection
        title="Gestión de Pedidos"
        icon={<ClipboardList className="h-5 w-5" />}
        currentType={`type Order = {
  id: string
  status: string
  customer: string
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
          "src/components/admin/orders/OrdersTable.tsx"
        ]}
      />

      <TypeComparisonSection
        title="Gestión de Clientes"
        icon={<Users className="h-5 w-5" />}
        currentType={`type Customer = {
  id: string
  name: string
  email: string
}`}
        supabaseType={`type Database {
  public: {
    Tables: {
      customers: {
        Row: {
          id: string
          user_id: string
          full_name: string
          email: string
          phone: string | null
          status: Database["public"]["Enums"]["customer_status"]
          metadata: Json | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          full_name: string
          email: string
          phone?: string | null
          status?: Database["public"]["Enums"]["customer_status"]
          metadata?: Json | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          full_name?: string
          email?: string
          phone?: string | null
          status?: Database["public"]["Enums"]["customer_status"]
          metadata?: Json | null
          created_at?: string
          updated_at?: string | null
        }
      }
    }
    Enums: {
      customer_status: "active" | "inactive" | "blocked"
    }
  }
}`}
        status="reviewed"
        relatedFiles={[
          "src/components/admin/customers/types.ts",
          "src/components/admin/customers/CustomersTable.tsx"
        ]}
      />

      <TypeComparisonSection
        title="Gestión de Envíos"
        icon={<Truck className="h-5 w-5" />}
        currentType={`type ShippingManagement = {
  id: string
  orderId: string
  carrier: string
  trackingNumber: string
  status: string
}`}
        supabaseType={`type Database {
  public: {
    Tables: {
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
          "src/components/admin/shipping/ShippingTabs.tsx"
        ]}
      />
    </div>
  )
}