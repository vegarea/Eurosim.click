import { Order } from "@/types/database/orders"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { formatCurrency } from "@/utils/currency"
import { ShippingAddress } from "@/types/database/common"

interface OrderBasicInfoProps {
  order: Order
}

export function OrderBasicInfo({ order }: OrderBasicInfoProps) {
  const shippingAddress = order.shipping_address as ShippingAddress | null
  const shippingCost = (order.metadata as any)?.shipping_cost || 0
  const subtotal = order.total_amount - shippingCost

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Información de Pago */}
          <div>
            <h3 className="font-medium mb-3">Detalles del Pago</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              {shippingCost > 0 && (
                <div className="flex justify-between text-sm">
                  <span>Costo de envío</span>
                  <span>{formatCurrency(shippingCost)}</span>
                </div>
              )}
              <div className="flex justify-between font-medium pt-2 border-t">
                <span>Total</span>
                <span>{formatCurrency(order.total_amount)}</span>
              </div>
            </div>
          </div>

          {/* Dirección de Envío */}
          {shippingAddress && (
            <div>
              <h3 className="font-medium mb-3">Dirección de Envío</h3>
              <div className="text-sm space-y-1">
                <p>{shippingAddress.street}</p>
                <p>
                  {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postal_code}
                </p>
                <p>{shippingAddress.country}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}