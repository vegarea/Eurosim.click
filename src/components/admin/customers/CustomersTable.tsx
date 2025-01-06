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
import { Customer } from "@/types/database/customers"
import { format } from "date-fns"
import { es } from "date-fns/locale"

interface CustomersTableProps {
  customers: Customer[]
  isLoading: boolean
  onViewDetails: (customer: Customer) => void
}

export function CustomersTable({ customers, isLoading, onViewDetails }: CustomersTableProps) {
  if (isLoading) {
    return <div className="text-center py-4">Cargando clientes...</div>
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead>Contacto</TableHead>
            <TableHead>Fecha de Registro</TableHead>
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
                  {customer.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      {customer.phone}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                {customer.created_at && format(new Date(customer.created_at), "PPP", { locale: es })}
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