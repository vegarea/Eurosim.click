import { useCart } from "@/contexts/CartContext"
import { useCheckout } from "@/contexts/CheckoutContext"
import { supabase } from "@/integrations/supabase/client"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useState } from "react"
import { CreditCard } from "lucide-react"

export function StripeCheckout() {
  const { items: cartItems } = useCart()
  const { state: { customerInfo, orderInfo } } = useCheckout()
  const [isLoading, setIsLoading] = useState(false)

  const validateCustomerInfo = () => {
    const requiredFields = {
      name: 'nombre',
      email: 'correo electrónico',
      phone: 'teléfono',
      passport_number: 'número de pasaporte',
      birth_date: 'fecha de nacimiento',
      gender: 'género'
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([key]) => !customerInfo[key])
      .map(([_, label]) => label);

    if (missingFields.length > 0) {
      toast.error(`Por favor completa los siguientes campos: ${missingFields.join(', ')}`);
      return false;
    }

    return true;
  }

  const handleCheckout = async () => {
    try {
      if (!validateCustomerInfo()) {
        return;
      }

      setIsLoading(true);

      // Log detallado de los datos antes de enviar
      console.group('🚀 Iniciando checkout');
      console.log('📦 Cart Items:', cartItems);
      console.log('👤 Customer Info:', {
        ...customerInfo,
        default_shipping_address: customerInfo.default_shipping_address 
          ? JSON.stringify(customerInfo.default_shipping_address, null, 2)
          : null
      });
      console.log('📋 Order Info:', orderInfo);
      console.groupEnd();

      // Pausa para asegurar que los logs sean visibles
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('⏳ Invocando create-checkout...');
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          cartItems,
          customerInfo,
          orderInfo
        },
      });

      if (error) {
        console.error('❌ Error from create-checkout:', error);
        throw error;
      }

      if (data?.url) {
        console.log('✅ URL de Stripe recibida:', data.url);
        // Pausa adicional antes de redireccionar
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('🔄 Redirigiendo a Stripe...');
        window.location.href = data.url;
      } else {
        throw new Error('No se recibió la URL de checkout');
      }
    } catch (error) {
      console.error('❌ Error al iniciar el checkout:', error);
      toast.error('Error al procesar el pago. Por favor intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button 
      onClick={handleCheckout}
      className="w-full"
      size="lg"
      disabled={isLoading}
    >
      <CreditCard className="mr-2 h-4 w-4" />
      {isLoading ? 'Procesando...' : 'Realizar pago'}
    </Button>
  )
}