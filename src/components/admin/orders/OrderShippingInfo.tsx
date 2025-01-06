import { Order } from "@/types/database/orders"
import { MapPin } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ShippingAddress } from "@/types/database/common"

interface OrderShippingInfoProps {
  order: Order
}

export function OrderShippingInfo({ order }: OrderShippingInfoProps) {
  const shippingAddress = order.shipping_address as ShippingAddress | null;

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
              <p>{shippingAddress?.street || "No especificada"}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Ciudad</h3>
              <p>{shippingAddress?.city || "No especificada"}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-1">Estado</h3>
              <p>{shippingAddress?.state || "No especificado"}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Código Postal</h3>
              <p>{shippingAddress?.postal_code || "No especificado"}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}