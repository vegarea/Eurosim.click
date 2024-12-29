import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { Order } from "./types";

interface OrdersTableProps {
  orders: Order[];
  onStatusChange: (orderId: string, newStatus: Order['status']) => void;
}

const getSimTypeBadgeStyle = (type: "physical" | "esim") => {
  if (type === "physical") {
    return "bg-[#D3E4FD] text-blue-700 hover:bg-[#D3E4FD]"; // Soft blue
  }
  return "bg-[#E5DEFF] text-purple-700 hover:bg-[#E5DEFF]"; // Soft purple
};

export function OrdersTable({ orders }: OrdersTableProps) {
  const navigate = useNavigate();

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
            <TableRow 
              key={order.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => navigate(`/admin/orders/${order.id}`)}
            >
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{new Date(order.created_at || '').toLocaleDateString()}</TableCell>
              <TableCell>{order.customers?.name || "No especificado"}</TableCell>
              <TableCell>
                <Badge 
                  variant="secondary" 
                  className={getSimTypeBadgeStyle(order.type)}
                >
                  {order.type === "physical" ? "SIM Física" : "E-SIM"}
                </Badge>
              </TableCell>
              <TableCell>${(order.total_amount / 100).toFixed(2)}</TableCell>
              <TableCell>
                <OrderStatusBadge status={order.status} />
              </TableCell>
              <TableCell>
                {order.payment_method ? (
                  <span className="capitalize">{order.payment_method}</span>
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}