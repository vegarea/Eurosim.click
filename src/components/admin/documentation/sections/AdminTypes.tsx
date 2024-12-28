import { Package, ClipboardList, Users } from "lucide-react"
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
        supabaseType={`type Product = {
  id: uuid
  title: text
  price: integer
  type: "physical" | "esim"
  created_at: timestamp
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
        supabaseType={`type Order = {
  id: uuid
  status: OrderStatus
  customer_id: uuid
  created_at: timestamp
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
        supabaseType={`type Customer = {
  id: uuid
  name: text
  email: text
  created_at: timestamp
}`}
        status="reviewed"
        relatedFiles={[
          "src/components/admin/customers/types.ts",
          "src/components/admin/customers/CustomersTable.tsx"
        ]}
      />
    </div>
  )
}