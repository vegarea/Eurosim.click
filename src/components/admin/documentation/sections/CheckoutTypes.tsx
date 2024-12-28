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
        supabaseType={`type Order = {
  id: uuid
  customer_id: uuid
  status: OrderStatus
  type: "physical" | "esim"
  total_amount: integer
  payment_method: PaymentMethod
  created_at: timestamp
  updated_at: timestamp
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
        supabaseType={`type OrderItem = {
  id: uuid
  order_id: uuid
  product_id: uuid
  quantity: integer
  unit_price: integer
  total_price: integer
  created_at: timestamp
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
        supabaseType={`type ShippingInfo = {
  id: uuid
  order_id: uuid
  address: text
  city: text
  state: text
  zip_code: text
  carrier: text
  tracking_number: text
  created_at: timestamp
  updated_at: timestamp
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