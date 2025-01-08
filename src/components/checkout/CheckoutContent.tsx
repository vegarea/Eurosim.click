import React from "react"
import { DocumentationForm } from "./DocumentationForm"
import { ShippingForm } from "./ShippingForm"
import { PaymentStep } from "./PaymentStep"
import { useCheckout } from "@/contexts/CheckoutContext"
import { ShippingFormValues } from "./shipping/types"
import { DocumentationFormValues } from "./documentation/types"
import { Card } from "@/components/ui/card"
import { PersonalInfoFields } from "./shipping/PersonalInfoFields"
import { Form } from "@/components/ui/form"
import { useCheckoutForm } from "./forms/useCheckoutForm"

interface CheckoutContentProps {
  step: number;
  hasPhysicalSim: boolean;
  isTestMode: boolean;
  testData: {
    shipping: ShippingFormValues;
    documentation: DocumentationFormValues;
  };
  onFormValidityChange: (isValid: boolean) => void;
}

export function CheckoutContent({
  step,
  hasPhysicalSim,
  isTestMode,
  testData,
  onFormValidityChange,
}: CheckoutContentProps) {
  const { state, updateOrderInfo } = useCheckout()
  const form = useCheckoutForm()

  // Validación del paso de pago
  React.useEffect(() => {
    if (step === 3) {
      const isValid = !!state.customerInfo.email && 
                     !!state.customerInfo.name && 
                     !!state.customerInfo.phone;
      console.log("Payment step validation:", { 
        isValid, 
        email: state.customerInfo.email,
        name: state.customerInfo.name,
        phone: state.customerInfo.phone,
        state: state 
      });
      onFormValidityChange(isValid);
    }
  }, [step, state.customerInfo, onFormValidityChange]);

  const handleFormSubmit = (values: ShippingFormValues) => {
    console.log("Form submitted with values:", values);

    if (values.shipping_address) {
      updateOrderInfo({
        shipping_address: values.shipping_address,
        type: hasPhysicalSim ? "physical" : "esim"
      })
    }
  }

  const getCurrentStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            {/* Información Personal siempre visible */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Información Personal</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
                  <PersonalInfoFields form={form} />
                </form>
              </Form>
            </Card>

            {/* Dirección de envío solo para SIM física */}
            {hasPhysicalSim && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Dirección de Envío</h2>
                <ShippingForm
                  form={form}
                  onSubmit={handleFormSubmit}
                  onValidityChange={onFormValidityChange}
                  isTestMode={isTestMode}
                  testData={testData.shipping}
                  initialData={state.customerInfo}
                  skipPersonalInfo={true}
                />
              </Card>
            )}
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Información Personal</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
                  <PersonalInfoFields form={form} />
                </form>
              </Form>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Documentación UE</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-blue-700 text-sm">
                  Para cumplir con las regulaciones de la Unión Europea y poder asignarte un número local europeo,
                  necesitamos algunos datos adicionales. Esta información es requerida por las autoridades de telecomunicaciones.
                </p>
              </div>
              <DocumentationForm
                onSubmit={handleFormSubmit}
                onValidityChange={onFormValidityChange}
                isTestMode={isTestMode}
                testData={testData.documentation}
                initialData={state.customerInfo}
              />
            </Card>
          </div>
        );
      case 3:
        return (
          <PaymentStep 
            formData={state}
          />
        );
      default:
        return null;
    }
  }

  return (
    <div className="space-y-6">
      {getCurrentStep()}
    </div>
  )
}