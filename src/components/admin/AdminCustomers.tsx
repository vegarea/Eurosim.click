import { useState } from "react"
import { useOrders } from "@/contexts/OrdersContext"
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

export function AdminCustomers() {
  const { orders } = useOrders()
  const [search, setSearch] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  // Crear un mapa de clientes únicos basado en los pedidos
  const customers = orders.reduce((acc, order) => {
    if (!acc[order.customer]) {
      acc[order.customer] = {
        name: order.customer,
        email: order.email || "No especificado",
        phone: order.phone || "No especificado",
        orders: [],
        totalSpent: 0,
        shippingInfo: {},
        documentation: {}
      }
    }
    acc[order.customer].orders.push(order)
    acc[order.customer].totalSpent += order.total

    // Actualizar información de envío y documentación si está disponible
    if (order.shippingAddress) {
      acc[order.customer].shippingInfo = {
        address: order.shippingAddress,
        city: order.city,
        state: order.state,
        zipCode: order.zipCode
      }
    }
    if (order.passportNumber) {
      acc[order.customer].documentation = {
        passportNumber: order.passportNumber,
        birthDate: order.birthDate,
        gender: order.gender,
        activationDate: order.activationDate
      }
    }
    return acc
  }, {} as Record<string, any>)

  // Filtrar clientes basado en la búsqueda
  const filteredCustomers = Object.values(customers).filter(customer => 
    customer.name.toLowerCase().includes(search.toLowerCase()) ||
    customer.email.toLowerCase().includes(search.toLowerCase()) ||
    customer.phone.toLowerCase().includes(search.toLowerCase())
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