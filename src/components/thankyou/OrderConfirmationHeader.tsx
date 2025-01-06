import { CheckCircle2 } from "lucide-react"
import { Card } from "@/components/ui/card"

interface OrderConfirmationHeaderProps {
  customerEmail: string;
}

export function OrderConfirmationHeader({ customerEmail }: OrderConfirmationHeaderProps) {
  return (
    <div className="text-center mb-8">
      <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        ¡Gracias por tu compra!
      </h1>
      <p className="text-gray-600 mb-2">
        Tu pedido ha sido confirmado y procesado correctamente
      </p>
      <p className="text-sm text-gray-500">
        Hemos enviado los detalles de tu pedido a: <span className="font-medium">{customerEmail}</span>
      </p>
    </div>
  )
}