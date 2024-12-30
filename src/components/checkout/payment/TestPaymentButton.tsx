import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCheckoutLogger } from "../CheckoutLogger";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/contexts/CartContext";
import { OrderItemInsert } from "@/types/database/orderItems";

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

      // 2. Crear la orden primero (sin customer_id)
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          product_id: items[0].product_id,
          status: 'processing',
          type: items[0].metadata?.product_type,
          total_amount: items.reduce((acc, item) => acc + item.total_price, 0),
          quantity: items[0].quantity,
          payment_method: 'test',
          payment_status: 'completed',
          shipping_address: localStorage.getItem('checkout_shippingAddress') ? 
            JSON.parse(localStorage.getItem('checkout_shippingAddress') || '{}') : 
            null,
          activation_date: localStorage.getItem('checkout_activationDate'),
          metadata: {
            customer_name: fullName,
            customer_email: email,
            customer_phone: localStorage.getItem('checkout_phone')
          }
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
      const orderItems: OrderItemInsert[] = items.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: item.unit_price,
        total_price: item.total_price,
        metadata: item.metadata
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

      // 4. Crear el cliente solo después de verificar el pago
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

      // 5. Actualizar la orden con el customer_id
      const { error: updateOrderError } = await supabase
        .from('orders')
        .update({ customer_id: customer.id })
        .eq('id', order.id);

      if (updateOrderError) {
        logCheckoutEvent({
          step: 3,
          action: 'Error al actualizar orden con customer_id',
          status: 'error',
          data: updateOrderError
        });
        throw updateOrderError;
      }

      // 6. Limpiar carrito y mostrar éxito
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

      // 7. Limpiar localStorage
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