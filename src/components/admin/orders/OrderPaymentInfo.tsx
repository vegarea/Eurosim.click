import { Order } from "@/types/order.types"
import { CreditCard, ExternalLink } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface OrderPaymentInfoProps {
  order: Order
  paymentData: {
    paymentUrl: string
    logs: Array<{
      date: string
      event: string
      status: string
    }>
  }
}

export function OrderPaymentInfo({ order, paymentData }: OrderPaymentInfoProps) {
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
          <div>
            <h3 className="font-medium mb-2">Método de Pago</h3>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="capitalize">
                {order.payment_method || "No especificado"}
              </Badge>
            </div>
          </div>

          {paymentData.paymentUrl && (
            <div>
              <h3 className="font-medium mb-2">URL de Pago</h3>
              <a 
                href={paymentData.paymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline flex items-center gap-1"
              >
                Ver en {order.payment_method} <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          )}

          <div>
            <h3 className="font-medium mb-2">Registro de Eventos</h3>
            <div className="space-y-2">
              {paymentData.logs.map((log, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                >
                  <div>
                    <p className="text-sm font-medium">{log.event}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(log.date).toLocaleString()}
                    </p>
                  </div>
                  <Badge 
                    variant="secondary"
                    className={log.status === "completed" ? "bg-green-100 text-green-800" : ""}
                  >
                    {log.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}