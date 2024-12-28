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
    name: "Order",
    currentType: `type Order = {
  id: string
  status: OrderStatus
  customer: string
  total: number
  type: "physical" | "esim"
  // ... otros campos
}`,
    supabaseType: `type Order = Database["public"]["Tables"]["orders"]["Row"] = {
  id: string
  customer_id: string
  status: Database["public"]["Enums"]["order_status"]
  type: Database["public"]["Enums"]["order_type"]
  // ... otros campos
}`,
    locations: [
      "src/components/admin/orders/types.ts",
      "src/components/checkout/types.ts",
      "src/contexts/OrdersContext.tsx"
    ],
    category: "component",
    status: "pending"
  },
  {
    name: "Customer",
    currentType: `type Customer = {
  id: string
  name: string
  email: string
  phone?: string
}`,
    supabaseType: `type Customer = Database["public"]["Tables"]["customers"]["Row"] = {
  id: string
  name: string
  email: string
  phone: string | null
}`,
    locations: [
      "src/components/admin/customers/types.ts",
      "src/components/admin/customers/CustomersTable.tsx"
    ],
    category: "component",
    status: "pending"
  },
  // ... Aquí irían todos los tipos encontrados
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