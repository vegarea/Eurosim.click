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
      console.log('Starting checkout with:', { cartItems, customerInfo, orderInfo });

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          cartItems,
          customerInfo,
          orderInfo
        },
      });

      if (error) {
        console.error('Error from create-checkout:', error);
        throw error;
      }

      if (data?.url) {
        console.log('Redirecting to Stripe checkout:', data.url);
        window.location.href = data.url;
      } else {
        throw new Error('No se recibió la URL de checkout');
      }
    } catch (error) {
      console.error('Error al iniciar el checkout:', error);
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