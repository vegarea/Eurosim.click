import { useState } from "react"
import { PaymentMethodSelector } from "./payment/PaymentMethodSelector"
import { TestPaymentButton } from "./payment/TestPaymentButton"
import { useCheckoutContext } from "@/contexts/CheckoutContext"

export function PaymentStep() {
  const [selectedMethod, setSelectedMethod] = useState<string>("stripe")
  const { formData } = useCheckoutContext()

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
        Método de pago
      </h2>
      
      <PaymentMethodSelector 
        selectedMethod={selectedMethod}
        onMethodChange={setSelectedMethod}
      />

      {selectedMethod === "stripe" && (
        <div className="mt-6 space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">
              Serás redirigido a Stripe para completar tu pago de forma segura.
            </p>
          </div>
        </div>
      )}

      <TestPaymentButton formData={formData} />
    </div>
  )
}