import { useState } from "react";
import { PaymentMethodSelector } from "./payment/PaymentMethodSelector";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { formatCurrency } from "@/utils/currency";
import { CheckoutProcessor } from "./utils/checkoutProcessor";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { OrderItem } from "@/types/database/orderItems";

interface PaymentStepProps {
  formData: Record<string, any>;
  onSubmit?: () => void;
}

export function PaymentStep({ formData, onSubmit }: PaymentStepProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>("test");
  const [isProcessing, setIsProcessing] = useState(false);
  const { items, clearCart } = useCart();
  const navigate = useNavigate();

  // Calcular el total
  const total = items.reduce((sum, item) => sum + item.total_price, 0);

  const handleCompleteOrder = async () => {
    try {
      setIsProcessing(true);
      console.log("Iniciando procesamiento de orden...", { formData, items, total });

      const processor = new CheckoutProcessor(
        formData,
        items,
        total
      );

      const result = await processor.process();

      if (result.success) {
        console.log("Orden completada exitosamente", result);
        toast.success("¡Orden completada exitosamente!");
        clearCart();
        onSubmit?.();
        navigate("/");
      }

    } catch (error) {
      console.error("Error processing checkout:", error);
      toast.error("Error al procesar la orden");
    } finally {
      setIsProcessing(false);
    }
  };

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
          onClick={handleCompleteOrder}
          disabled={isProcessing}
        >
          {isProcessing ? "Procesando..." : "Completar Orden"}
        </Button>
      </div>
    </div>
  );
}