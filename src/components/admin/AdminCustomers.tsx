import { useState } from "react"
import { useCustomers } from "@/hooks/useCustomers"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CustomersTable } from "./customers/CustomersTable"
import { CustomerDetailsModal } from "./customers/CustomerDetailsModal"
import { Customer } from "@/types/database/customers"

export function AdminCustomers() {
  const { customers, isLoading } = useCustomers()
  const [search, setSearch] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  // Filtrar clientes basado en la búsqueda
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(search.toLowerCase()) ||
    customer.email.toLowerCase().includes(search.toLowerCase()) ||
    (customer.phone && customer.phone.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Clientes</CardTitle>
          <CardDescription>
            Administra la información de tus clientes y sus pedidos relacionados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <Search className="w-5 h-5 text-gray-500" />
            <Input
              placeholder="Buscar por nombre, email o teléfono..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <CustomersTable 
            customers={filteredCustomers}
            isLoading={isLoading}
            onViewDetails={(customer) => {
              setSelectedCustomer(customer)
              setIsDetailsOpen(true)
            }}
          />
        </CardContent>
      </Card>

      <CustomerDetailsModal
        customer={selectedCustomer}
        isOpen={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
      />
    </div>
  )
}