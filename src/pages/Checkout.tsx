import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon, ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/CartContext"
import { ShippingForm } from "@/components/checkout/ShippingForm"
import { DocumentationForm } from "@/components/checkout/DocumentationForm"
import { ESimForm } from "@/components/checkout/ESimForm"
import { PaymentStep } from "@/components/checkout/PaymentStep"
import { CheckoutProgress } from "@/components/checkout/CheckoutProgress"
import { CheckoutLayout } from "@/components/checkout/CheckoutLayout"
import { useCheckoutFlow } from "@/hooks/useCheckoutFlow"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const CHECKOUT_STEPS = ['Información', 'Documentación', 'Pago']

export default function Checkout() {
  const { items } = useCart()
  const navigate = useNavigate()
  const {
    step,
    isFormValid,
    formData,
    isProcessing,
    loadTestData,
    handleFormValidityChange,
    handleFormSubmit,
    handleBack
  } = useCheckoutFlow()
  
  const hasPhysicalSim = items.some(item => item.type === "physical")

  // Redirigir si el carrito está vacío
  useEffect(() => {
    if (items.length === 0) {
      navigate('/')
    }
  }, [items, navigate])

  // No renderizar nada si el carrito está vacío
  if (items.length === 0) {
    return null
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            {hasPhysicalSim ? (
              <>
                <Alert className="mb-6 bg-blue-50 border-blue-200">
                  <InfoIcon className="h-4 w-4 text-blue-500" />
                  <AlertDescription className="text-blue-700">
                    Tienes un SIM físico en tu carrito. Por favor, proporciona tu información de envío.
                  </AlertDescription>
                </Alert>
                <ShippingForm 
                  onSubmit={handleFormSubmit}
                  onValidityChange={handleFormValidityChange}
                  initialData={formData}
                />
              </>
            ) : (
              <ESimForm 
                onSubmit={handleFormSubmit}
                onValidityChange={handleFormValidityChange}
                initialData={{
                  fullName: formData.fullName,
                  email: formData.email,
                  phone: formData.phone
                }}
              />
            )}
          </>
        )
      case 2:
        return (
          <DocumentationForm
            onSubmit={handleFormSubmit}
            onValidityChange={handleFormValidityChange}
            initialData={formData}
          />
        )
      case 3:
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
    <CheckoutLayout 
      onLoadTestData={() => loadTestData(hasPhysicalSim)}
      showCheckoutButton={step === 3}
      isButtonEnabled={isFormValid && !isProcessing}
      onCheckout={() => handleFormSubmit(formData)}
      isProcessing={isProcessing}
    >
      <CheckoutProgress step={step} steps={CHECKOUT_STEPS} />
      {renderStepContent()}
      
      <div className="flex justify-between mt-8">
        {step > 1 && (
          <Button
            variant="outline"
            onClick={handleBack}
            className="flex items-center gap-2"
            disabled={isProcessing}
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </Button>
        )}
        {step < 3 && (
          <Button
            className="ml-auto flex items-center gap-2"
            onClick={() => isFormValid && handleFormSubmit(formData)}
            disabled={!isFormValid || isProcessing}
          >
            Siguiente
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </CheckoutLayout>
  )
}