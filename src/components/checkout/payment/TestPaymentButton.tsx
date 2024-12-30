import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/CartContext"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router-dom"
import { OrderStatus, PaymentMethod, PaymentStatus } from "@/types/database/enums"
import { Customer, CustomerInsert } from "@/types/database/customers"
import { Order } from "@/types/database/orders"

interface TestPaymentButtonProps {
  formData: Record<string, any>;
}

export function TestPaymentButton({ formData }: TestPaymentButtonProps) {
  const { items, clearCart } = useCart()
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleTestPayment = async () => {
    try {
      // 1. Crear la orden primero sin customer_id
      const orderData: Partial<Order> = {
        product_id: items[0].product_id,
        status: 'processing' as OrderStatus,
        type: items[0].metadata?.product_type || 'esim',
        total_amount: items.reduce((acc, item) => acc + item.total_price, 0),
        quantity: items.reduce((acc, item) => acc + item.quantity, 0),
        payment_method: 'test' as PaymentMethod,
        payment_status: 'completed' as PaymentStatus,
        shipping_address: formData.shipping_address || null,
        activation_date: formData.activation_date ? new Date(formData.activation_date).toISOString() : null
      }

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert(orderData)
        .select()
        .single()

      if (orderError) throw orderError

      // 2. Crear el customer después de verificar el pago exitoso
      const customerData: CustomerInsert = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone || null,
        passport_number: formData.passportNumber || null,
        birth_date: formData.birthDate ? new Date(formData.birthDate).toISOString() : null,
        gender: formData.gender || null,
        default_shipping_address: formData.shipping_address || null,
        preferred_language: 'es',
        marketing_preferences: {
          email_marketing: false,
          sms_marketing: false,
          push_notifications: false
        }
      }

      const { data: customer, error: customerError } = await supabase
        .from('customers')
        .insert(customerData)
        .select()
        .single()

      if (customerError) throw customerError

      // 3. Actualizar la orden con el customer_id
      const { error: updateError } = await supabase
        .from('orders')
        .update({ customer_id: customer.id })
        .eq('id', order.id)

      if (updateError) throw updateError

      // 4. Crear los order_items
      const orderItemsData = items.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: item.unit_price,
        total_price: item.total_price,
        metadata: item.metadata
      }))

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItemsData)

      if (itemsError) throw itemsError

      toast({
        title: "Pago simulado exitoso",
        description: "El pedido ha sido procesado correctamente.",
      })

      clearCart()
      navigate(`/orders/${order.id}`)
    } catch (error) {
      console.error('Error en el proceso de pago:', error)
      toast({
        title: "Error en el proceso",
        description: "Hubo un problema al procesar el pedido.",
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