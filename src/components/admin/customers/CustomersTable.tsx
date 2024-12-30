import { User, Mail, Phone, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ExtendedCustomer } from "@/types/ui/customers"

interface CustomersTableProps {
  customers: ExtendedCustomer[]
  onViewDetails: (customer: ExtendedCustomer) => void
}

export function CustomersTable({ customers, onViewDetails }: CustomersTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead>Contacto</TableHead>
            <TableHead>Pedidos</TableHead>
            <TableHead>Total Gastado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">{customer.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    {customer.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    {customer.phone}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span className="font-medium">{customer.orders.length}</span> pedidos
              </TableCell>
              <TableCell>
                <span className="font-medium">
                  ${(customer.totalSpent / 100).toFixed(2)}
                </span>
              </TableCell>
              <TableCell>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="gap-2"
                  onClick={() => onViewDetails(customer)}
                >
                  <ExternalLink className="h-4 w-4" />
                  Ver detalles
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
