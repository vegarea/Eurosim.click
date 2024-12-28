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
import { Order } from "@/types/database"

interface CustomerData {
  customer_id: string;
  name: string;
  email: string;
  phone: string;
  orders: Order[];
  totalSpent: number;
  shippingInfo: {
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  documentation: {
    passportNumber?: string;
    birthDate?: string;
    gender?: string;
    activationDate?: string;
  };
}

export function AdminCustomers() {
  const { orders } = useOrders()
  const [search, setSearch] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerData | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  // Crear un mapa de clientes únicos basado en los pedidos
  const customers = orders.reduce((acc, order) => {
    const customerId = order.customer_id
    if (!acc[customerId]) {
      acc[customerId] = {
        customer_id: customerId,
        name: order.customer_name || "No especificado",
        email: order.metadata?.customer_email as string || "No especificado",
        phone: order.metadata?.customer_phone as string || "No especificado",
        orders: [],
        totalSpent: 0,
        shippingInfo: {},
        documentation: {}
      }
    }
    acc[customerId].orders.push(order)
    acc[customerId].totalSpent += order.total_amount

    // Actualizar información de envío y documentación si está disponible
    if (order.shipping_address) {
      acc[customerId].shippingInfo = {
        address: (order.shipping_address as any).street,
        city: (order.shipping_address as any).city,
        state: (order.shipping_address as any).state,
        zipCode: (order.shipping_address as any).postal_code
      }
    }
    
    if (order.metadata) {
      acc[customerId].documentation = {
        passportNumber: order.metadata.passport_number,
        birthDate: order.metadata.birth_date,
        gender: order.metadata.gender,
        activationDate: order.activation_date
      }
    }
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
