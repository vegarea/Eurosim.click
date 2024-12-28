import { ShoppingCart, Package } from "lucide-react"
import { TypeComparisonSection } from "../components/TypeComparisonSection"

export function CheckoutTypes() {
  return (
    <div className="space-y-6">
      <TypeComparisonSection
        title="Formulario de Checkout"
        icon={<ShoppingCart className="h-5 w-5" />}
        currentType={`type CheckoutForm = {
  customer: CustomerInfo
  shipping: ShippingInfo
  payment: PaymentInfo
  documentation?: DocumentationInfo
}`}
        supabaseType={`type Order = {
  id: uuid
  customer_id: uuid
  shipping_address: jsonb
  payment_method: PaymentMethod
  documentation_status: string
  created_at: timestamp
}`}
        status="pending"
        relatedFiles={[
          "src/components/checkout/CheckoutForm.tsx",
          "src/components/checkout/types.ts"
        ]}
      />

      <TypeComparisonSection
        title="Carrito de Compras"
        icon={<Package className="h-5 w-5" />}
        currentType={`type CartItem = {
  id: string
  quantity: number
  price: number
}`}
        supabaseType={`type CartItem = {
  id: uuid
  product_id: uuid
  quantity: integer
  price: integer
  created_at: timestamp
}`}
        status="pending"
        relatedFiles={[
          "src/components/cart/CartContext.tsx",
          "src/components/cart/types.ts"
        ]}
      />
    </div>
  )
}