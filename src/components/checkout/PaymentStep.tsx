import { useState } from "react";
import { PaymentMethodSelector } from "./payment/PaymentMethodSelector";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { formatCurrency } from "@/utils/currency";

interface PaymentStepProps {
  onSubmit?: () => void;
}

export function PaymentStep({ onSubmit }: PaymentStepProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>("stripe");
  const { items } = useCart();

  // Calcular el total
  const total = items.reduce((sum, item) => sum + item.total_price, 0);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
        Método de pago
      </h2>
      
      <PaymentMethodSelector 
        selectedMethod={selectedMethod}
        onMethodChange={setSelectedMethod}
      />

      <div className="mt-8">
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Total a pagar:</span>
            <span className="text-lg font-bold">
              {formatCurrency(total)}
            </span>
          </div>
        </div>

        <Button 
          className="w-full"
          size="lg"
          onClick={onSubmit}
        >
          Completar Orden
        </Button>
      </div>
    </div>
  );
}