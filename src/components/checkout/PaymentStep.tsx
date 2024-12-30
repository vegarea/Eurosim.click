import { useState } from "react";
import { PaymentMethodSelector } from "./payment/PaymentMethodSelector";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { formatCurrency } from "@/utils/currency";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface PaymentStepProps {
  onSubmit?: () => void;
}

export function PaymentStep({ onSubmit }: PaymentStepProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>("stripe");
  const [isLoading, setIsLoading] = useState(false);
  const { items, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Calcular el total
  const total = items.reduce((sum, item) => sum + item.total_price, 0);

  const handleCreateOrder = async () => {
    setIsLoading(true);
    try {
      // Crear la orden
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          product_id: items[0].id, // Asumimos un solo producto por ahora
          status: 'payment_pending',
          type: items[0].type,
          total_amount: total,
          quantity: items[0].quantity,
          payment_method: selectedMethod,
          payment_status: 'pending',
          metadata: {
            items: items
          }
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Crear los items de la orden
      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        unit_price: item.price,
        total_price: item.total_price,
        metadata: item.metadata
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      toast({
        title: "Orden creada exitosamente",
        description: "Serás redirigido al proceso de pago",
      });

      // Limpiar el carrito después de crear la orden
      clearCart();
      
      // Si hay un callback onSubmit, ejecutarlo
      if (onSubmit) onSubmit();

      // Aquí deberíamos redirigir al usuario a la página de pago
      // Por ahora solo navegamos al inicio
      navigate('/');

    } catch (error) {
      console.error('Error al crear la orden:', error);
      toast({
        title: "Error al crear la orden",
        description: "Por favor intenta nuevamente",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
          onClick={handleCreateOrder}
          disabled={isLoading}
        >
          {isLoading ? "Procesando..." : "Completar Orden"}
        </Button>
      </div>
    </div>
  );
}