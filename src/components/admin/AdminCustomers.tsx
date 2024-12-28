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
import { CustomerDocumentation } from "@/types/order/orderTypes"

interface CustomerData {
  name: string;
  email: string;
  phone: string;
  orders: any[];
  totalSpent: number;
  shippingInfo: {
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  documentation: CustomerDocumentation;
}

export function AdminCustomers() {
  const { orders } = useOrders()
  const [search, setSearch] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerData | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  // Crear un mapa de clientes únicos basado en los pedidos
  const customers = orders.reduce((acc, order) => {
    const customerName = order.customer?.name || 'Unknown';
    if (!acc[customerName]) {
      acc[customerName] = {
        name: customerName,
        email: order.customer?.email || "No especificado",
        phone: order.customer?.phone || "No especificado",
        orders: [],
        totalSpent: 0,
        shippingInfo: order.shipping_address ? {
          address: order.shipping_address.street,
          city: order.shipping_address.city,
          state: order.shipping_address.state,
          zipCode: order.shipping_address.postal_code
        } : {},
        documentation: order.customer?.documentation || {
          passportNumber: undefined,
          birthDate: undefined,
          gender: undefined,
          activationDate: undefined
        }
      }
    }
    acc[customerName].orders.push(order)
    acc[customerName].totalSpent += order.total_amount

    return acc
  }, {} as Record<string, CustomerData>)

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