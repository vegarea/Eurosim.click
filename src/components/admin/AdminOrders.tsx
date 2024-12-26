import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { 
  AlertCircle, 
  RefreshCw, 
  Check, 
  X, 
  CreditCard,
  Package,
  Mail,
  Ban
} from "lucide-react"

// Tipos de datos
type OrderStatus = 
  | "payment_pending"
  | "payment_failed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"

type OrderType = "physical" | "esim"

interface Order {
  id: string
  date: string
  customer: string
  total: number
  status: OrderStatus
  type: OrderType
  paymentMethod?: "stripe" | "paypal"
}

// Datos de ejemplo
const mockOrders: Order[] = [
  {
    id: "ORD-001",
    date: "2024-03-20",
    customer: "Juan Pérez",
    total: 299.99,
    status: "payment_pending",
    type: "physical"
  },
  {
    id: "ORD-002",
    date: "2024-03-19",
    customer: "María García",
    total: 159.50,
    status: "processing",
    type: "esim",
    paymentMethod: "stripe"
  },
  {
    id: "ORD-003",
    date: "2024-03-18",
    customer: "Carlos López",
    total: 499.99,
    status: "delivered",
    type: "physical",
    paymentMethod: "paypal"
  },
  {
    id: "ORD-004",
    date: "2024-03-17",
    customer: "Ana Martínez",
    total: 89.99,
    status: "payment_failed",
    type: "esim"
  },
]

const statusConfig = {
  payment_pending: {
    label: "Pago Pendiente",
    color: "bg-yellow-100 text-yellow-800",
    icon: CreditCard,
  },
  payment_failed: {
    label: "Error de Pago",
    color: "bg-red-100 text-red-800",
    icon: AlertCircle,
  },
  processing: {
    label: "Procesando",
    color: "bg-blue-100 text-blue-800",
    icon: RefreshCw,
  },
  shipped: {
    label: "Enviado",
    color: "bg-orange-100 text-orange-800",
    icon: Package,
  },
  delivered: {
    label: "Entregado",
    color: "bg-green-100 text-green-800",
    icon: Check,
  },
  cancelled: {
    label: "Cancelado",
    color: "bg-gray-100 text-gray-800",
    icon: Ban,
  },
}

export function AdminOrders() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all")

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestión de Pedidos</h1>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Buscar por ID o cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value as OrderStatus | "all")}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            {Object.entries(statusConfig).map(([key, { label }]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Pedido</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Método de Pago</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => {
              const status = statusConfig[order.status]
              const StatusIcon = status.icon
              
              return (
                <TableRow key={order.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-gray-100">
                      {order.type === "physical" ? "SIM Física" : "E-SIM"}
                    </Badge>
                  </TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary" 
                      className={`flex items-center gap-1 ${status.color}`}
                    >
                      <StatusIcon className="w-3 h-3" />
                      {status.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {order.paymentMethod ? (
                      <span className="capitalize">{order.paymentMethod}</span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}