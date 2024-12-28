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
            <p>{order.passportNumber || "No especificado"}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Fecha de nacimiento</h4>
            <p>{order.birthDate || "No especificada"}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Género</h4>
            <p>{order.gender === 'M' ? 'Masculino' : order.gender === 'F' ? 'Femenino' : 'No especificado'}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Fecha de activación</h4>
            <p>{order.activationDate || "No especificada"}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}