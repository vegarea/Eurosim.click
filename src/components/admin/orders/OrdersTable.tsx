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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { statusConfig } from "./OrderStatusBadge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
            <Accordion type="single" collapsible key={order.id}>
              <AccordionItem value={order.id}>
                <AccordionTrigger asChild>
                  <TableRow className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">{order.id}</TableCell>
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
                </AccordionTrigger>
                <TableRow>
                  <TableCell colSpan={7} className="p-0">
                    <AccordionContent>
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
                        {/* Aquí puedes agregar más secciones de información según necesites */}
                      </div>
                    </AccordionContent>
                  </TableCell>
                </TableRow>
              </AccordionItem>
            </Accordion>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}