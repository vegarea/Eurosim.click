import { ShoppingCart, Database, User, FileText, Settings, Lock, Server, Mail, Package, ClipboardList, Users, BookOpen } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TypeComparisonSection } from "./components/TypeComparisonSection"
import { TypesChecklist } from "./components/TypesChecklist"
import { TypesCounter } from "./components/TypesCounter"
import { typesChecklistData } from "./data/typesChecklistData"

export function TypesComparison() {
  // Calcular el total de tipos y revisados
  const totalTypes = typesChecklistData.reduce(
    (acc, category) => acc + category.items.length,
    0
  )
  
  const reviewedTypes = typesChecklistData.reduce(
    (acc, category) => 
      acc + category.items.filter(
        item => item.status === "completed" || item.status === "reviewed"
      ).length,
    0
  )

  return (
    <div className="space-y-6">
      <TypesCounter totalTypes={totalTypes} reviewedTypes={reviewedTypes} />
      
      <Tabs defaultValue="checklist" className="space-y-4">
        <TabsList>
          <TabsTrigger value="checklist">Vista General</TabsTrigger>
          <TabsTrigger value="checkout">Área de Compra</TabsTrigger>
          <TabsTrigger value="admin">Panel Admin</TabsTrigger>
          <TabsTrigger value="system">Sistema</TabsTrigger>
        </TabsList>

        <TabsContent value="checklist">
          <TypesChecklist items={typesChecklistData} />
        </TabsContent>

        <TabsContent value="checkout">
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
        </TabsContent>

        <TabsContent value="admin">
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
              status="pending"
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
              status="pending"
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
              status="pending"
              relatedFiles={[
                "src/components/admin/customers/types.ts",
                "src/components/admin/customers/CustomersTable.tsx"
              ]}
            />
          </div>
        </TabsContent>

        <TabsContent value="system">
          <div className="space-y-6">
            <TypeComparisonSection
              title="Base de Datos"
              icon={<Database className="h-5 w-5" />}
              currentType={`// Tipos actuales en el sistema`}
              supabaseType={`// Tipos requeridos por Supabase`}
              status="pending"
              relatedFiles={[
                "docs/database/schema.ts",
                "src/types/database.ts"
              ]}
            />

            <TypeComparisonSection
              title="Autenticación"
              icon={<Lock className="h-5 w-5" />}
              currentType={`type User = {
  id: string
  email: string
}`}
              supabaseType={`type User = {
  id: uuid
  email: text
  created_at: timestamp
}`}
              status="pending"
              relatedFiles={[
                "src/components/auth/types.ts",
                "src/contexts/AuthContext.tsx"
              ]}
            />

            <TypeComparisonSection
              title="Almacenamiento"
              icon={<Server className="h-5 w-5" />}
              currentType={`type StorageFile = {
  path: string
  type: string
}`}
              supabaseType={`type StorageFile = {
  id: uuid
  path: text
  type: text
  created_at: timestamp
}`}
              status="pending"
              relatedFiles={[
                "src/services/storage.ts",
                "src/types/storage.ts"
              ]}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}