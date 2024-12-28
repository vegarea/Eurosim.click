import { Order } from "./types"
import { FileText } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface OrderDocumentationProps {
  order: Order
}

export function OrderDocumentation({ order }: OrderDocumentationProps) {
  const metadata = order.metadata as any;
  
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
            <p>{metadata?.passport_number || "No especificado"}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Fecha de nacimiento</h4>
            <p>{metadata?.birth_date || "No especificada"}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Género</h4>
            <p>{metadata?.gender === 'M' ? 'Masculino' : metadata?.gender === 'F' ? 'Femenino' : 'No especificado'}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Fecha de activación</h4>
            <p>{order.activation_date ? new Date(order.activation_date).toLocaleDateString() : "No especificada"}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}