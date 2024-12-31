import { useState } from "react"
import { PaymentMethodSelector } from "./payment/PaymentMethodSelector"
import { useCart } from "@/contexts/CartContext"
import { formatCurrency } from "@/utils/currency"
import { StripeCheckout } from "./payment/StripeCheckout"
import { Card } from "@/components/ui/card"

interface PaymentStepProps {
  formData: Record<string, any>
}

export function PaymentStep({ formData }: PaymentStepProps) {
  const [selectedMethod] = useState<string>("stripe")
  const { items } = useCart()

  const total = items.reduce((sum, item) => sum + item.total_price, 0)

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
        Método de pago
      </h2>
      
      <PaymentMethodSelector 
        selectedMethod={selectedMethod}
        onMethodChange={() => {}}
      />

      <Card className="p-6">
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Total a pagar:</span>
            <span className="text-lg font-bold">
              {formatCurrency(total)}
            </span>
          </div>
        </div>

        <StripeCheckout />
      </Card>
    </div>
  )
}