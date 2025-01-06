import { Order } from "@/types/database/orders"
import { FileText, Calendar } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { format } from "date-fns"
import { es } from "date-fns/locale"

interface OrderDocumentationProps {
  order: Order
}

export function OrderDocumentation({ order }: OrderDocumentationProps) {
  const customer = order.customer
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-gray-500" />
          Documentación UE
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Pasaporte</h4>
            <p>{customer?.passport_number || "No especificado"}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Fecha de nacimiento</h4>
            <p>
              {customer?.birth_date 
                ? format(new Date(customer.birth_date), "PPP", { locale: es })
                : "No especificada"}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Género</h4>
            <p>
              {customer?.gender === 'M' 
                ? 'Masculino' 
                : customer?.gender === 'F' 
                  ? 'Femenino' 
                  : 'No especificado'}
            </p>
          </div>
          
          {/* Fecha de activación con fondo pastel */}
          <div className="col-span-2 bg-[#F2FCE2] p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-500 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Fecha de activación
            </h4>
            <p className="font-medium">
              {order.activation_date 
                ? format(new Date(order.activation_date), "PPP", { locale: es })
                : "No especificada"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}