import { Order } from "./types"
import { CreditCard, ExternalLink } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/utils/currency"

interface OrderPaymentInfoProps {
  order: Order
}

export function OrderPaymentInfo({ order }: OrderPaymentInfoProps) {
  // Formatear el monto total para mostrar
  const formattedAmount = formatCurrency(order.total_amount)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-gray-500" />
          Información de Pago
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">Método de Pago</h3>
              <Badge variant="outline" className="capitalize">
                {order.payment_method || "No especificado"}
              </Badge>
            </div>
            <div>
              <h3 className="font-medium mb-2">Estado del Pago</h3>
              <Badge 
                variant={order.payment_status === "completed" ? "default" : "secondary"}
                className="capitalize"
              >
                {order.payment_status}
              </Badge>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Monto Total</h3>
            <p className="text-lg font-semibold">{formattedAmount}</p>
          </div>

          {order.stripe_payment_intent_id && (
            <div>
              <h3 className="font-medium mb-2">ID de Pago Stripe</h3>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-600">{order.stripe_payment_intent_id}</p>
                <a 
                  href={`https://dashboard.stripe.com/payments/${order.stripe_payment_intent_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1 text-sm"
                >
                  Ver en Stripe <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          )}

          {order.stripe_receipt_url && (
            <div>
              <h3 className="font-medium mb-2">Recibo de Pago</h3>
              <a 
                href={order.stripe_receipt_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline flex items-center gap-1"
              >
                Ver en Stripe <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          )}

          {order.paypal_order_id && (
            <div>
              <h3 className="font-medium mb-2">ID de Pago PayPal</h3>
              <p className="text-sm text-gray-600">{order.paypal_order_id}</p>
            </div>
          )}

          {order.paypal_receipt_url && (
            <div>
              <h3 className="font-medium mb-2">Recibo de PayPal</h3>
              <a 
                href={order.paypal_receipt_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline flex items-center gap-1"
              >
                Ver en PayPal <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          )}

          {order.events && order.events.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">Registro de Eventos de Pago</h3>
              <div className="space-y-2">
                {order.events
                  .filter(event => event.type.includes('payment'))
                  .map((event, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                    >
                      <div>
                        <p className="text-sm font-medium">{event.description}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(event.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}