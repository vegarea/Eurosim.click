import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

const orderTypes = {
  current: `
type Order = {
  id: string
  customer: string
  email?: string
  phone?: string
  total: number
  status: OrderStatus
  type: OrderType
  paymentMethod?: "stripe" | "paypal"
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
  supabase: `
type Order = {
  id: uuid
  customer_id: uuid
  product_id: uuid
  status: OrderStatus
  type: "physical" | "esim"
  total_amount: number
  quantity: number
  payment_method: "stripe" | "paypal"
  payment_status: PaymentStatus
  stripe_payment_intent_id?: string
  stripe_receipt_url?: string
  paypal_order_id?: string
  paypal_receipt_url?: string
  shipping_address?: ShippingAddress
  tracking_number?: string
  carrier?: string
  activation_date?: string
  notes?: string[]
  metadata?: Record<string, any>
  created_at: string
  updated_at: string
}`
}

const customerTypes = {
  current: `
type Customer = {
  id: string
  name: string
  email: string
  phone?: string
}`,
  supabase: `
type Customer = {
  id: uuid
  name: text
  email: text
  phone: text
  passport_number: text
  birth_date: date
  gender: "M" | "F"
  default_shipping_address: ShippingAddress
  billing_address: Address
  preferred_language: text
  marketing_preferences: MarketingPreferences
  stripe_customer_id: text
  paypal_customer_id: text
  metadata: Record<string, any>
  created_at: timestamp
  updated_at: timestamp
}`
}

const productTypes = {
  current: `
type Product = {
  id: string
  title: string
  description: string
  price: number
  type: "physical" | "esim"
}`,
  supabase: `
type Product = {
  id: uuid
  type: "physical" | "esim"
  title: text
  description: text
  price: number
  features: string[]
  europe_gb: number
  spain_gb: number
  status: "active" | "inactive"
  stock: number
  metadata: Record<string, any>
  created_at: timestamp
  updated_at: timestamp
}`
}

const TypeComparison = ({ title, current, supabase }: { title: string, current: string, supabase: string }) => (
  <Card className="mb-6">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Tipos Actuales</h3>
          <pre className="bg-slate-50 p-4 rounded-md overflow-x-auto">
            <code>{current}</code>
          </pre>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-2">Tipos Supabase</h3>
          <pre className="bg-slate-50 p-4 rounded-md overflow-x-auto">
            <code>{supabase}</code>
          </pre>
        </div>
      </div>
    </CardContent>
  </Card>
)

export function TypesComparison() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Comparación de Tipos</CardTitle>
          <CardDescription>
            Análisis de los tipos actuales del proyecto vs los tipos requeridos por Supabase
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="orders" className="space-y-4">
            <TabsList>
              <TabsTrigger value="orders">Pedidos</TabsTrigger>
              <TabsTrigger value="customers">Clientes</TabsTrigger>
              <TabsTrigger value="products">Productos</TabsTrigger>
            </TabsList>

            <ScrollArea className="h-[600px] rounded-md border p-4">
              <TabsContent value="orders">
                <div className="space-y-4">
                  <TypeComparison 
                    title="Tipos de Pedidos" 
                    current={orderTypes.current} 
                    supabase={orderTypes.supabase} 
                  />
                  <Card>
                    <CardHeader>
                      <CardTitle>Cambios Necesarios</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Cambiar nombres de campos a snake_case</li>
                        <li>Agregar campos faltantes: customer_id, product_id, payment_status</li>
                        <li>Modificar estructura de shipping_address a tipo complejo</li>
                        <li>Agregar campos de auditoría: created_at, updated_at</li>
                        <li>Agregar campos de pagos: stripe/paypal fields</li>
                        <li>Agregar soporte para notas y metadata</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="customers">
                <div className="space-y-4">
                  <TypeComparison 
                    title="Tipos de Clientes" 
                    current={customerTypes.current} 
                    supabase={customerTypes.supabase} 
                  />
                  <Card>
                    <CardHeader>
                      <CardTitle>Cambios Necesarios</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Agregar campos de documentación: passport_number, birth_date</li>
                        <li>Agregar campos de direcciones como objetos complejos</li>
                        <li>Agregar preferencias de marketing y lenguaje</li>
                        <li>Agregar IDs de proveedores de pago</li>
                        <li>Agregar campos de auditoría y metadata</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="products">
                <div className="space-y-4">
                  <TypeComparison 
                    title="Tipos de Productos" 
                    current={productTypes.current} 
                    supabase={productTypes.supabase} 
                  />
                  <Card>
                    <CardHeader>
                      <CardTitle>Cambios Necesarios</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Agregar campos de GB para Europa y España</li>
                        <li>Agregar campo de features como array</li>
                        <li>Agregar campo de status y stock</li>
                        <li>Agregar campos de auditoría y metadata</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}