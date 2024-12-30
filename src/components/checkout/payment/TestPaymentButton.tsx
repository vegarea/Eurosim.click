import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCheckoutLogger } from "../CheckoutLogger";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/contexts/CartContext";

export function TestPaymentButton() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { items, clearCart } = useCart();
  const { toast } = useToast();
  const { logCheckoutEvent } = useCheckoutLogger();

  const handleTestPayment = async () => {
    try {
      setIsProcessing(true);
      
      const fullName = localStorage.getItem('checkout_fullName');
      const email = localStorage.getItem('checkout_email');
      
      if (!fullName || !email) {
        throw new Error('Faltan datos requeridos del cliente');
      }

      logCheckoutEvent({
        step: 3,
        action: 'Iniciando pago de prueba',
        status: 'info',
        data: { fullName, email }
      });

      // 1. Crear el cliente
      const { data: customer, error: customerError } = await supabase
        .from('customers')
        .insert({
          name: fullName,
          email: email,
          phone: localStorage.getItem('checkout_phone'),
          passport_number: localStorage.getItem('checkout_passportNumber'),
          birth_date: localStorage.getItem('checkout_birthDate'),
          default_shipping_address: localStorage.getItem('checkout_shippingAddress') ? 
            JSON.parse(localStorage.getItem('checkout_shippingAddress') || '{}') : 
            null
        })
        .select('*')
        .maybeSingle();

      if (customerError || !customer) {
        logCheckoutEvent({
          step: 3,
          action: 'Error al crear cliente',
          status: 'error',
          data: customerError
        });
        throw customerError;
      }

      logCheckoutEvent({
        step: 3,
        action: 'Cliente creado exitosamente',
        status: 'success',
        data: customer
      });

      // 2. Crear la orden
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_id: customer.id,
          product_id: items[0].id,
          status: 'processing',
          type: items[0].type,
          total_amount: items.reduce((acc, item) => acc + (item.price * item.quantity), 0),
          quantity: items[0].quantity,
          payment_method: 'test',
          payment_status: 'completed',
          shipping_address: localStorage.getItem('checkout_shippingAddress') ? 
            JSON.parse(localStorage.getItem('checkout_shippingAddress') || '{}') : 
            null,
          activation_date: localStorage.getItem('checkout_activationDate')
        })
        .select('*')
        .maybeSingle();

      if (orderError || !order) {
        logCheckoutEvent({
          step: 3,
          action: 'Error al crear orden',
          status: 'error',
          data: orderError
        });
        throw orderError;
      }

      logCheckoutEvent({
        step: 3,
        action: 'Orden creada exitosamente',
        status: 'success',
        data: order
      });

      // 3. Crear los items de la orden
      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        unit_price: item.price,
        total_price: item.price * item.quantity
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        logCheckoutEvent({
          step: 3,
          action: 'Error al crear items de la orden',
          status: 'error',
          data: itemsError
        });
        throw itemsError;
      }

      // 4. Limpiar carrito y mostrar éxito
      clearCart();
      toast({
        title: "¡Compra de prueba exitosa!",
        description: `Orden creada con ID: ${order.id}`,
      });

      logCheckoutEvent({
        step: 3,
        action: 'Compra de prueba completada',
        status: 'success',
        data: { orderId: order.id }
      });

      // 5. Limpiar localStorage
      const checkoutKeys = [
        'checkout_fullName',
        'checkout_email',
        'checkout_phone',
        'checkout_passportNumber',
        'checkout_birthDate',
        'checkout_shippingAddress',
        'checkout_activationDate'
      ];
      checkoutKeys.forEach(key => localStorage.removeItem(key));

    } catch (error) {
      console.error('Error en pago de prueba:', error);
      toast({
        title: "Error en la compra de prueba",
        description: "Hubo un error al procesar la compra de prueba.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="mt-6">
      <Button
        onClick={handleTestPayment}
        disabled={isProcessing}
        className="w-full bg-yellow-500 hover:bg-yellow-600"
      >
        {isProcessing ? "Procesando..." : "Pagar con Test (Simulación)"}
      </Button>
      <p className="text-sm text-gray-500 mt-2 text-center">
        Este botón simula un pago exitoso para pruebas
      </p>
    </div>
  );
}