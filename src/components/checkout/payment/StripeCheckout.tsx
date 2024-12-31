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
      // Transformar los items para Stripe
      const lineItems = cartItems.map(item => ({
        ...item,
        title: item.metadata && typeof item.metadata === 'object' ? 
          (item.metadata as Record<string, any>).product_title || 'Product' : 'Product',
        description: item.metadata && typeof item.metadata === 'object' ? 
          (item.metadata as Record<string, any>).description || undefined : undefined
      }))

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          cartItems: lineItems,
          customerInfo,
        },
      })

      if (error) throw error

      if (data?.url) {
        window.location.href = data.url
      } else {
        throw new Error('No se recibió la URL de checkout')
      }
    } catch (error) {
      console.error('Error al iniciar el checkout:', error)
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