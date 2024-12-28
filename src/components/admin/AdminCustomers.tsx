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
import { Order } from "@/types/database/orders"
import { Customer } from "@/types/database/customers"

interface CustomerData extends Customer {
  orders: Order[];
  totalSpent: number;
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
      // Extraer información del cliente del metadata del pedido
      const metadata = order.metadata as Record<string, any> | null
      
      acc[customerId] = {
        id: customerId,
        name: metadata?.customer_name || "No especificado",
        email: metadata?.customer_email || "No especificado",
        phone: metadata?.customer_phone || "No especificado",
        orders: [],
        totalSpent: 0,
        // Inicializar campos opcionales
        passport_number: null,
        birth_date: null,
        gender: null,
        default_shipping_address: null,
        billing_address: null,
        preferred_language: 'es',
        marketing_preferences: {
          email_marketing: false,
          sms_marketing: false,
          push_notifications: false
        },
        stripe_customer_id: null,
        paypal_customer_id: null,
        metadata: {},
        created_at: order.created_at,
        updated_at: order.updated_at
      }
    }
    acc[customerId].orders.push(order)
    acc[customerId].totalSpent += order.total_amount

    // Actualizar información de envío y documentación si está disponible
    if (order.shipping_address) {
      acc[customerId].default_shipping_address = order.shipping_address as any
    }
    
    if (order.metadata) {
      const metadata = order.metadata as Record<string, any>
      acc[customerId].passport_number = metadata.passport_number || null
      acc[customerId].birth_date = metadata.birth_date || null
      acc[customerId].gender = metadata.gender || null
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