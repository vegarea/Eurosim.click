import { ReviewField } from "./ReviewField"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/CartContext"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router-dom"
import { Json } from "@/types/database/common"
import { CheckoutLogger, useCheckoutLogger } from "./CheckoutLogger"

interface ReviewStepProps {
  formData: any
  onUpdateField: (field: string, value: any) => void
}

export function ReviewStep({ formData, onUpdateField }: ReviewStepProps) {
  const { items, clearCart } = useCart()
  const { toast } = useToast()
  const navigate = useNavigate()
  const { logCheckoutEvent } = useCheckoutLogger()
  
  const fieldLabels: Record<string, string> = {
    fullName: "Nombre completo",
    birthDate: "Fecha de nacimiento",
    gender: "Género",
    passportNumber: "Número de pasaporte",
    activationDate: "Fecha de activación"
  }

  const genderMap: Record<string, string> = {
    M: "Masculino",
    F: "Femenino"
  }

  const handleCompleteOrder = async () => {
    try {
      logCheckoutEvent({
        step: 3,
        action: "Iniciando proceso de orden",
        status: "info",
        data: { formData, items }
      });

      // 1. Crear el customer
      const customerData = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        passport_number: formData.passportNumber,
        birth_date: formData.birthDate,
        gender: formData.gender
      }

      logCheckoutEvent({
        step: 3,
        action: "Creando cliente",
        status: "info",
        data: { customerData }
      });

      const { data: customer, error: customerError } = await supabase
        .from('customers')
        .insert(customerData)
        .select()
        .single()

      if (customerError) {
        logCheckoutEvent({
          step: 3,
          action: "Error creando cliente",
          status: "error",
          data: customerError,
          details: customerError.message
        });
        throw customerError
      }

      logCheckoutEvent({
        step: 3,
        action: "Cliente creado exitosamente",
        status: "success",
        data: { customer }
      });

      // 2. Crear la orden
      const orderData = {
        customer_id: customer.id,
        status: 'processing',
        type: items.some(item => item.metadata?.product_type === 'physical') ? 'physical' : 'esim',
        total_amount: items.reduce((total, item) => total + item.total_price, 0),
        quantity: items.reduce((total, item) => total + item.quantity, 0),
        payment_method: 'test',
        payment_status: 'completed',
        shipping_address: formData.shippingAddress || null,
        activation_date: formData.activationDate || null,
        product_id: items[0].product_id,
      }

      logCheckoutEvent({
        step: 3,
        action: "Creando orden",
        status: "info",
        data: { orderData }
      });

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert(orderData)
        .select()
        .single()

      if (orderError) {
        logCheckoutEvent({
          step: 3,
          action: "Error creando orden",
          status: "error",
          data: orderError,
          details: orderError.message
        });
        throw orderError
      }

      logCheckoutEvent({
        step: 3,
        action: "Orden creada exitosamente",
        status: "success",
        data: { order }
      });

      // 3. Crear los order_items
      const orderItemsData = items.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: item.unit_price,
        total_price: item.total_price,
        metadata: {
          product_title: item.metadata?.product_title,
          product_type: item.metadata?.product_type,
          data_eu_gb: item.metadata?.data_eu_gb,
          data_es_gb: item.metadata?.data_es_gb
        } as Json
      }))

      logCheckoutEvent({
        step: 3,
        action: "Creando items de orden",
        status: "info",
        data: { orderItemsData }
      });

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItemsData)

      if (itemsError) {
        logCheckoutEvent({
          step: 3,
          action: "Error creando items de orden",
          status: "error",
          data: itemsError,
          details: itemsError.message
        });
        throw itemsError
      }

      logCheckoutEvent({
        step: 3,
        action: "Items de orden creados exitosamente",
        status: "success"
      });

      // 4. Limpiar el carrito y mostrar mensaje de éxito
      clearCart()
      toast({
        title: "¡Orden completada!",
        description: "Tu orden ha sido procesada exitosamente.",
      })
      
      // 5. Redirigir al inicio
      navigate('/')

    } catch (error) {
      console.error('Error al procesar la orden:', error)
      toast({
        title: "Error al procesar la orden",
        description: "Hubo un problema al procesar tu orden. Por favor, intenta nuevamente.",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-blue-700 text-sm">
          Por favor, revisa cuidadosamente tu información antes de continuar.
          La <strong>fecha de activación</strong> es especialmente importante ya que determinará cuándo podrás comenzar a usar tu servicio.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        {Object.entries(formData).map(([key, value]) => {
          if (fieldLabels[key]) {
            const displayValue = key === 'gender' ? genderMap[value as string] || value : value;
            
            return (
              <ReviewField
                key={key}
                label={fieldLabels[key]}
                value={displayValue as string | Date}
                onUpdate={(newValue) => onUpdateField(key, newValue)}
                type={key.includes("Date") ? "date" : "text"}
                isActivationDate={key === "activationDate"}
              />
            );
          }
          return null;
        })}
      </div>

      <Button 
        className="w-full bg-primary hover:bg-primary/90"
        onClick={handleCompleteOrder}
        size="lg"
      >
        Completar Orden
      </Button>
    </div>
  )
}