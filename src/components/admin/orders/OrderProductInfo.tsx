import { Order } from "@/types/database/orders"
import { OrderMetadata } from "@/types/database/common"
import { Package2, CreditCard, Wifi } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface OrderProductInfoProps {
  order: Order
}

export function OrderProductInfo({ order }: OrderProductInfoProps) {
  const metadata = order.metadata as OrderMetadata | null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package2 className="h-5 w-5 text-gray-500" />
          Detalles del Producto
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-1">Producto</h3>
            <div className="flex items-center gap-2">
              {order.type === 'physical' ? (
                <CreditCard className="h-4 w-4 text-primary" />
              ) : (
                <Wifi className="h-4 w-4 text-primary" />
              )}
              <span>{metadata?.product_title || "No especificado"}</span>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-1">Tipo de SIM</h3>
            <Badge variant="secondary" className="capitalize">
              {order.type === 'physical' ? 'SIM Física' : 'eSIM'}
            </Badge>
          </div>
          <div>
            <h3 className="font-medium mb-1">Datos en Europa</h3>
            <p className="font-semibold text-primary">
              {metadata?.product_data_eu || "0"}GB
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-1">Datos en España</h3>
            <p className="font-semibold text-primary">
              {metadata?.product_data_es || "0"}GB
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-1">Cantidad</h3>
            <p>{order.quantity || 1}</p>
          </div>
          <div>
            <h3 className="font-medium mb-1">Precio</h3>
            <p className="font-semibold">${(order.total_amount / 100).toFixed(2)} MXN</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}