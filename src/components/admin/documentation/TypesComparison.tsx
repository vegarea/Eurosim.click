import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TypeComparisonSection } from "./components/TypeComparisonSection"
import { TypesChecklist } from "./components/TypesChecklist"
import { typesChecklistData } from "./data/typesChecklistData"

export function TypesComparison() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="checklist" className="space-y-4">
        <TabsList>
          <TabsTrigger value="checklist">Lista de Verificación</TabsTrigger>
          <TabsTrigger value="orders">Pedidos</TabsTrigger>
          <TabsTrigger value="customers">Clientes</TabsTrigger>
          <TabsTrigger value="products">Productos</TabsTrigger>
        </TabsList>

        <TabsContent value="checklist">
          <TypesChecklist items={typesChecklistData} />
        </TabsContent>

        <TabsContent value="orders">
          <div className="space-y-6">
            <TypeComparisonSection
              title="Pedidos"
              currentType={`type Order = {
  id: string
  date: string
  customer: string
  email?: string
  phone?: string
  total: number
  status: OrderStatus
  type: OrderType
  paymentMethod?: string
}`}
              supabaseType={`type Order = {
  id: uuid
  customer_id: uuid
  product_id: uuid
  status: OrderStatus
  type: "physical" | "esim"
  total_amount: integer
  quantity: integer
  payment_method: PaymentMethod
  created_at: timestamp
  updated_at: timestamp
}`}
              status="pending"
              relatedFiles={[
                "src/components/admin/orders/types.ts",
                "src/components/admin/orders/OrdersTable.tsx"
              ]}
            />
          </div>
        </TabsContent>

        <TabsContent value="customers">
          <div className="space-y-6">
            <TypeComparisonSection
              title="Clientes"
              currentType={`type Customer = {
  id: string
  name: string
  email: string
  phone?: string
}`}
              supabaseType={`type Customer = {
  id: uuid
  name: text
  email: text
  phone: text
  passport_number: text
  birth_date: date
  gender: "M" | "F"
  created_at: timestamp
  updated_at: timestamp
}`}
              status="pending"
              relatedFiles={[
                "src/components/admin/customers/types.ts",
                "src/components/admin/customers/CustomersTable.tsx"
              ]}
            />
          </div>
        </TabsContent>

        <TabsContent value="products">
          <div className="space-y-6">
            <TypeComparisonSection
              title="Productos"
              currentType={`type Product = {
  id: string
  title: string
  description: string
  price: number
  type: "physical" | "esim"
}`}
              supabaseType={`type Product = {
  id: uuid
  type: "physical" | "esim"
  title: text
  description: text
  price: integer
  features: string[]
  europe_gb: integer
  spain_gb: integer
  status: "active" | "inactive"
  stock: integer
  created_at: timestamp
  updated_at: timestamp
}`}
              status="pending"
              relatedFiles={[
                "src/components/admin/products/types.ts",
                "src/components/admin/products/ProductCard.tsx"
              ]}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}