import { ShoppingCart, Package, ClipboardList } from "lucide-react"
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
        status="pending"
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
        status="pending"
        relatedFiles={[
          "src/components/admin/orders/types.ts",
          "src/components/checkout/CartItem.tsx"
        ]}
      />
    </div>
  )
}