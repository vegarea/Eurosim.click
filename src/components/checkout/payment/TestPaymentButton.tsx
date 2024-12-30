import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/CartContext"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router-dom"
import { OrderStatus, PaymentMethod, PaymentStatus } from "@/types/database/enums"

export function TestPaymentButton() {
  const { items, clearCart } = useCart()
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleTestPayment = async () => {
    try {
      const orderData = {
        product_id: items[0].product_id,
        status: 'processing' as OrderStatus,
        type: items[0].metadata?.product_type || 'esim',
        total_amount: items.reduce((acc, item) => acc + item.total_price, 0),
        quantity: items.reduce((acc, item) => acc + item.quantity, 0),
        payment_method: 'test' as PaymentMethod,
        payment_status: 'completed' as PaymentStatus
      }

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert(orderData)
        .select()
        .single()

      if (orderError) throw orderError

      toast({
        title: "Pago simulado",
        description: "El pago ha sido simulado exitosamente.",
      })

      clearCart()
      navigate(`/orders/${order.id}`)
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al simular el pago.",
        variant: "destructive"
      })
    }
  }

  return (
    <Button onClick={handleTestPayment} className="w-full">
      Simular Pago Exitoso
    </Button>
  )
}