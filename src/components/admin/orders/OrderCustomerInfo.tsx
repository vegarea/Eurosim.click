import { Order } from "@/types/database/orders"
import { User, Mail, Phone } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface OrderCustomerInfoProps {
  order: Order
}

export function OrderCustomerInfo({ order }: OrderCustomerInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-gray-500" />
          Información del Cliente
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Cliente</h3>
            <p className="flex items-center gap-2">
              <User className="h-4 w-4 text-gray-500" />
              {order.customer?.name || "Cliente no registrado"}
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Email</h3>
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-500" />
              {order.customer?.email || "No especificado"}
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Teléfono</h3>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-500" />
              {order.customer?.phone || "No especificado"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}