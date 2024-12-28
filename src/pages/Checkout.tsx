import { Header } from "@/components/Header"
import { Cart } from "@/components/cart/Cart"
import { PaymentSecurity } from "@/components/PaymentSecurity"
import { ShippingForm } from "@/components/checkout/ShippingForm"
import { DocumentationForm } from "@/components/checkout/DocumentationForm"
import { ReviewStep } from "@/components/checkout/ReviewStep"
import { ESimForm } from "@/components/checkout/ESimForm"
import { PaymentStep } from "@/components/checkout/PaymentStep"
import { useCart } from "@/contexts/CartContext"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon, Bug } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Check, ArrowRight, ArrowLeft } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"

export default function Checkout() {
  const { items, clearCart } = useCart()
  const [step, setStep] = useState(1)
  const [isFormValid, setIsFormValid] = useState(false)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()
  
  const hasPhysicalSim = items.some(item => item.type === "physical")
  const progress = (step / 4) * 100

  const handleFormValidityChange = (isValid: boolean) => {
    setIsFormValid(isValid)
  }

  const handleFormSubmit = async (values: any) => {
    if (step < 4) {
      setFormData({ ...formData, ...values })
      setStep(step + 1)
      setIsFormValid(step === 3)
      return
    }

    // Procesamiento final del pago
    setIsProcessing(true)
    try {
      // Crear el pedido en la base de datos
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_email: formData.email,
          customer_name: formData.fullName,
          type: items[0].type, // Assuming all items are of the same type
          total_amount: items.reduce((acc, item) => acc + (item.price * item.quantity), 0),
          quantity: items.reduce((acc, item) => acc + item.quantity, 0),
          shipping_address: hasPhysicalSim ? {
            street: formData.address,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            phone: formData.phone
          } : null,
          activation_date: formData.activationDate
        })
        .select()
        .single()

      if (orderError) throw orderError

      // Enviar email de confirmación con magic link
      const response = await fetch('/api/send-order-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          orderId: order.id,
          customerName: formData.fullName,
        }),
      })

      if (!response.ok) {
        throw new Error('Error al enviar el email de confirmación')
      }

      // Limpiar carrito y redireccionar
      clearCart()
      toast({
        title: "¡Pedido completado!",
        description: "Te hemos enviado un email con los detalles de tu compra.",
      })
      
      // Redireccionar a página de confirmación
      window.location.href = `/order-confirmation/${order.id}`
    } catch (error: any) {
      console.error('Error en el checkout:', error)
      toast({
        title: "Error al procesar el pedido",
        description: "Por favor, intenta nuevamente.",
        variant: "destructive"
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            {hasPhysicalSim && (
              <Alert className="mb-6 bg-blue-50 border-blue-200">
                <InfoIcon className="h-4 w-4 text-blue-500" />
                <AlertDescription className="text-blue-700">
                  Tienes un SIM físico en tu carrito. Por favor, proporciona tu información de envío.
                </AlertDescription>
              </Alert>
            )}
            {hasPhysicalSim ? (
              <ShippingForm 
                onSubmit={handleFormSubmit}
                onValidityChange={handleFormValidityChange}
              />
            ) : (
              <ESimForm 
                onSubmit={handleFormSubmit}
                onValidityChange={handleFormValidityChange}
              />
            )}
          </>
        )
      case 2:
        return (
          <DocumentationForm
            onSubmit={handleFormSubmit}
            onValidityChange={handleFormValidityChange}
          />
        )
      case 3:
        return (
          <ReviewStep
            formData={formData}
            onUpdateField={(field, value) => setFormData(prev => ({ ...prev, [field]: value }))}
          />
        )
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
              Método de pago
            </h2>
            <PaymentStep />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-white">
      <Header />
      
      <main className="container mx-auto py-8 px-4 max-w-5xl">
        <div className="max-w-5xl mx-auto">
          {/* Test Mode Button */}
          <div className="flex justify-end mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const data = hasPhysicalSim ? 
                  { fullName: "Juan Pérez", email: "juan@ejemplo.com", phone: "5512345678", address: "Calle Principal 123", city: "Ciudad de México", state: "CDMX", zipCode: "11111" } :
                  { fullName: "Juan Pérez", email: "juan@ejemplo.com", phone: "5512345678" };
                setFormData(data);
                setIsFormValid(true);
                toast({
                  title: "Modo de prueba activado",
                  description: "Se han cargado datos de prueba para facilitar el testing",
                });
              }}
              className="flex items-center gap-2"
            >
              <Bug className="w-4 h-4" />
              Cargar datos de prueba
            </Button>
          </div>

          {/* Progress Steps */}
          <div className="mb-8 space-y-4 max-w-3xl mx-auto">
            <div className="flex justify-between items-center">
              {['Información', 'Documentación', 'Revisión', 'Pago'].map((stepName, index) => (
                <motion.div
                  key={stepName}
                  className={`flex items-center ${index + 1 <= step ? 'text-primary' : 'text-gray-400'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
                    ${index + 1 <= step ? 'border-primary bg-primary text-white' : 'border-gray-300'}`}>
                    {index + 1 <= step ? <Check className="w-4 h-4" /> : index + 1}
                  </div>
                  <span className="ml-2 font-medium hidden sm:inline">{stepName}</span>
                </motion.div>
              ))}
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Columna izquierda - Formulario */}
            <motion.div 
              className="lg:col-span-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-xl shadow-sm p-6 max-w-2xl mx-auto">
                {renderStepContent()}
                
                <div className="flex justify-between mt-8">
                  {step > 1 && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        if (step > 1) {
                          setStep(step - 1);
                          setIsFormValid(true);
                        }
                      }}
                      className="flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Volver
                    </Button>
                  )}
                  {step < 4 && (
                    <Button
                      className="ml-auto flex items-center gap-2"
                      onClick={() => isFormValid && handleFormSubmit(formData)}
                      disabled={!isFormValid}
                    >
                      Siguiente
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Columna derecha - Resumen del carrito */}
            <motion.div 
              className="lg:col-span-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-xl shadow-sm p-6 lg:sticky lg:top-4">
                <Cart 
                  showCheckoutButton={step === 4} 
                  isButtonEnabled={isFormValid}
                  onCheckout={handleFormSubmit}
                />
                <div className="mt-4">
                  <PaymentSecurity />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}