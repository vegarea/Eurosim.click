import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { OrderStatusBadge } from "./OrderStatusBadge"
import { Order } from "./types"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { statusConfig } from "./OrderStatusBadge"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface OrdersTableProps {
  orders: Order[]
  onStatusChange: (orderId: string, newStatus: Order['status']) => void
}

const getSimTypeBadgeStyle = (type: "physical" | "esim") => {
  if (type === "physical") {
    return "bg-[#D3E4FD] text-blue-700 hover:bg-[#D3E4FD]" // Soft blue
  }
  return "bg-[#E5DEFF] text-purple-700 hover:bg-[#E5DEFF]" // Soft purple
}

export function OrdersTable({ orders, onStatusChange }: OrdersTableProps) {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  const toggleOrder = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId)
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID Pedido</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Método de Pago</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <>
              <TableRow 
                key={order.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => toggleOrder(order.id)}
              >
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <ChevronDown 
                      className={cn(
                        "h-4 w-4 transition-transform", 
                        expandedOrder === order.id ? "transform rotate-180" : ""
                      )}
                    />
                    {order.id}
                  </div>
                </TableCell>
                <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>
                  <Badge 
                    variant="secondary" 
                    className={getSimTypeBadgeStyle(order.type)}
                  >
                    {order.type === "physical" ? "SIM Física" : "E-SIM"}
                  </Badge>
                </TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <OrderStatusBadge status={order.status} />
                </TableCell>
                <TableCell>
                  {order.paymentMethod ? (
                    <span className="capitalize">{order.paymentMethod}</span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </TableCell>
              </TableRow>
              {expandedOrder === order.id && (
                <TableRow>
                  <TableCell colSpan={7} className="p-0">
                    <div className="p-4 space-y-4 bg-muted/5">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-medium mb-1">Detalles del Cliente</h3>
                          <p>{order.customer}</p>
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">Actualizar Estado</h3>
                          <div className="flex gap-2">
                            <Select
                              value={order.status}
                              onValueChange={(value) => onStatusChange(order.id, value as Order['status'])}
                            >
                              <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Seleccionar estado" />
                              </SelectTrigger>
                              <SelectContent>
                                {Object.entries(statusConfig).map(([key, { label }]) => (
                                  <SelectItem key={key} value={key}>
                                    {label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}