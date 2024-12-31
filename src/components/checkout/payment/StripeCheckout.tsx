import { useCart } from "@/contexts/CartContext"
import { useCheckout } from "@/contexts/CheckoutContext"
import { supabase } from "@/integrations/supabase/client"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export function StripeCheckout() {
  const { items: cartItems } = useCart()
  const { state: { customerInfo } } = useCheckout()

  const handleCheckout = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          cartItems: cartItems.map(item => ({
            ...item,
            title: item.metadata?.title || 'Product',
            description: item.metadata?.description,
          })),
          customerInfo,
        },
      })

      if (error) throw error

      if (data?.url) {
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL received')
      }
    } catch (error) {
      console.error('Error initiating checkout:', error)
      toast.error('Error al procesar el pago. Por favor intenta de nuevo.')
    }
  }

  return (
    <Button 
      onClick={handleCheckout}
      className="w-full"
      size="lg"
    >
      Continuar al pago
    </Button>
  )
}