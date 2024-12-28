import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface TypeItem {
  name: string
  currentType: string
  supabaseType: string
  locations: string[]
  category: "component" | "form" | "context" | "hook"
  status: "updated" | "pending"
}

const types: TypeItem[] = [
  {
    name: "CartItem",
    currentType: `interface CartItem {
  id: string
  type: "physical" | "esim"
  title: string
  description: string
  price: number
  quantity: number
}`,
    supabaseType: `type CartItem = Database["public"]["Tables"]["cart_items"]["Row"] = {
  id: string
  product_id: string
  quantity: number
  created_at: string
  updated_at: string | null
  metadata: Json | null
}`,
    locations: [
      "src/contexts/CartContext.tsx",
      "src/components/cart/Cart.tsx",
      "src/components/cart/CartItem.tsx"
    ],
    category: "component",
    status: "pending"
  },
  {
    name: "Order",
    currentType: `interface Order {
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
}`,
    supabaseType: `type Order = Database["public"]["Tables"]["orders"]["Row"] = {
  id: string
  customer_id: string
  product_id: string
  status: Database["public"]["Enums"]["order_status"]
  type: Database["public"]["Enums"]["order_type"]
  total_amount: number
  quantity: number
  payment_method: Database["public"]["Enums"]["payment_method"]
  payment_status: Database["public"]["Enums"]["payment_status"]
  shipping_address: Json | null
  tracking_number: string | null
  carrier: string | null
  activation_date: string | null
  notes: string[] | null
  metadata: Json | null
  created_at: string
  updated_at: string | null
}`,
    locations: [
      "src/contexts/OrdersContext.tsx",
      "src/components/admin/orders/types.ts",
      "src/components/checkout/types.ts",
      "src/pages/OrderDetails.tsx"
    ],
    category: "context",
    status: "pending"
  },
  {
    name: "DocumentationFormData",
    currentType: `interface DocumentationFormData {
  fullName: string
  birthDate: Date
  gender: string
  passportNumber: string
  activationDate: Date
}`,
    supabaseType: `type CustomerDocument = Database["public"]["Tables"]["customer_documents"]["Row"] = {
  id: string
  customer_id: string
  full_name: string
  birth_date: string
  gender: Database["public"]["Enums"]["gender"]
  passport_number: string
  activation_date: string
  status: Database["public"]["Enums"]["document_status"]
  created_at: string
  updated_at: string | null
}`,
    locations: [
      "src/components/checkout/DocumentationForm.tsx"
    ],
    category: "form",
    status: "pending"
  },
  {
    name: "ShippingFormData",
    currentType: `interface ShippingFormData {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
}`,
    supabaseType: `type ShippingAddress = Database["public"]["Tables"]["shipping_addresses"]["Row"] = {
  id: string
  customer_id: string
  full_name: string
  email: string
  phone: string
  street: string
  city: string
  state: string
  postal_code: string
  country: string
  is_default: boolean
  created_at: string
  updated_at: string | null
}`,
    locations: [
      "src/components/checkout/ShippingForm.tsx"
    ],
    category: "form",
    status: "pending"
  }
]

export function TypesList() {
  return (
    <ScrollArea className="h-[600px] w-full rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Nombre del Tipo</TableHead>
            <TableHead className="w-[300px]">Tipo Actual</TableHead>
            <TableHead className="w-[300px]">Tipo Supabase</TableHead>
            <TableHead>Ubicación</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {types.map((type, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{type.name}</TableCell>
              <TableCell>
                <pre className="text-xs bg-slate-50 p-2 rounded-md overflow-x-auto">
                  {type.currentType}
                </pre>
              </TableCell>
              <TableCell>
                <pre className="text-xs bg-slate-50 p-2 rounded-md overflow-x-auto">
                  {type.supabaseType}
                </pre>
              </TableCell>
              <TableCell>
                <ul className="list-disc list-inside text-sm">
                  {type.locations.map((location, idx) => (
                    <li key={idx} className="text-gray-600">{location}</li>
                  ))}
                </ul>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="capitalize">
                  {type.category}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge 
                  variant={type.status === "updated" ? "default" : "secondary"}
                  className={type.status === "updated" ? "bg-green-500" : ""}
                >
                  {type.status === "updated" ? "Actualizado a Supabase" : "Sin actualizar"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  )
}