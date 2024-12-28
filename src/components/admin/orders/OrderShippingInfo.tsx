import { Order } from "./types"
import { MapPin } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface OrderShippingInfoProps {
  order: Order
}

export function OrderShippingInfo({ order }: OrderShippingInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-gray-500" />
          Información de Envío
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-1">Dirección de envío</h3>
              <p>{order.shipping_address?.street || "No especificada"}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Ciudad</h3>
              <p>{order.shipping_address?.city || "No especificada"}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-1">Estado</h3>
              <p>{order.shipping_address?.state || "No especificado"}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Código Postal</h3>
              <p>{order.shipping_address?.postal_code || "No especificado"}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}