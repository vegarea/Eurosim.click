import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useCheckoutLogger } from "./CheckoutLogger";

export function PaymentStep() {
  const [selectedMethod, setSelectedMethod] = useState<string>("stripe");
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
        .select()
        .single();

      if (customerError) {
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
        .select()
        .single();

      if (orderError) {
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
    <div className="space-y-6">
      <div className="space-y-4">
        <RadioGroup
          defaultValue="stripe"
          onValueChange={setSelectedMethod}
          className="grid gap-4"
        >
          {/* Stripe Option */}
          <div>
            <RadioGroupItem
              value="stripe"
              id="stripe"
              className="peer sr-only"
            />
            <Label
              htmlFor="stripe"
              className={cn(
                "flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer",
              )}
            >
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg"
                    alt="Stripe"
                    className="h-6 object-contain"
                  />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Pagar con tarjeta
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Débito o Crédito
                    </p>
                  </div>
                </div>
              </div>
            </Label>
          </div>

          {/* PayPal Option */}
          <div>
            <RadioGroupItem
              value="paypal"
              id="paypal"
              className="peer sr-only"
              disabled
            />
            <Label
              htmlFor="paypal"
              className={cn(
                "flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-not-allowed opacity-60",
              )}
            >
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="https://cdn.worldvectorlogo.com/logos/paypal-3.svg"
                    alt="PayPal"
                    className="h-6 object-contain"
                  />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Pagar con PayPal
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Próximamente
                    </p>
                  </div>
                </div>
              </div>
            </Label>
          </div>
        </RadioGroup>

        {selectedMethod === "paypal" && (
          <Alert variant="info" className="bg-blue-50 border-blue-200 mt-4">
            <InfoIcon className="h-4 w-4 text-blue-500" />
            <AlertDescription className="text-blue-700">
              El pago con PayPal no está disponible en este momento. Por favor, selecciona otro método de pago.
            </AlertDescription>
          </Alert>
        )}

        {/* Botón de prueba */}
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

        {selectedMethod === "stripe" && (
          <div className="mt-6 space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">
                Serás redirigido a Stripe para completar tu pago de forma segura.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}