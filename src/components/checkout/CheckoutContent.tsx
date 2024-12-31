import React from "react"
import { DocumentationForm } from "./DocumentationForm"
import { ShippingForm } from "./ShippingForm"
import { PaymentStep } from "./PaymentStep"
import { useCheckout } from "@/contexts/CheckoutContext"
import { ShippingFormValues } from "./shipping/types"
import { DocumentationFormValues } from "./documentation/types"
import { format } from "date-fns"

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
  const { state, updateCustomerInfo, updateOrderInfo } = useCheckout()

  React.useEffect(() => {
    if (step === 3) {
      const isValid = !!state.customerInfo.email && !!state.customerInfo.name;
      console.log("Payment step validation:", { 
        isValid, 
        email: state.customerInfo.email,
        name: state.customerInfo.name,
        state: state 
      });
      onFormValidityChange(isValid);
    }
  }, [step, state.customerInfo.email, state.customerInfo.name, onFormValidityChange]);

  const handleFormSubmit = (values: any) => {
    console.log("Form submitted with values:", values);

    if (values.shippingAddress) {
      updateOrderInfo({
        shipping_address: values.shippingAddress,
        type: hasPhysicalSim ? "physical" : "esim"
      })
    }

    // Formatear las fechas al formato que espera Supabase (YYYY-MM-DD)
    const formattedBirthDate = values.birthDate ? 
      format(new Date(values.birthDate), 'yyyy-MM-dd') : 
      null;

    // Para activation_date mantenemos el timestamp completo que requiere Supabase
    const formattedActivationDate = values.activationDate ? 
      new Date(values.activationDate).toISOString() : 
      null;

    const customerInfo = {
      name: values.fullName || values.name, // Soporte para ambos campos
      email: values.email,
      phone: values.phone,
      passport_number: values.passportNumber,
      birth_date: formattedBirthDate,
      gender: values.gender,
      default_shipping_address: values.shippingAddress
    };

    console.log("Updating customer info with:", customerInfo);
    updateCustomerInfo(customerInfo);

    if (formattedActivationDate) {
      updateOrderInfo({
        activation_date: formattedActivationDate
      })
    }
  }

  const getCurrentStep = () => {
    switch (step) {
      case 1:
        if (hasPhysicalSim) {
          return (
            <ShippingForm
              onSubmit={handleFormSubmit}
              onValidityChange={onFormValidityChange}
              isTestMode={isTestMode}
              testData={testData.shipping}
              initialData={state.customerInfo}
            />
          )
        }
        return (
          <DocumentationForm
            onSubmit={handleFormSubmit}
            onValidityChange={onFormValidityChange}
            isTestMode={isTestMode}
            testData={testData.documentation}
            initialData={state.customerInfo}
          />
        )
      case 2:
        if (hasPhysicalSim) {
          return (
            <DocumentationForm
              onSubmit={handleFormSubmit}
              onValidityChange={onFormValidityChange}
              isTestMode={isTestMode}
              testData={testData.documentation}
              initialData={state.customerInfo}
            />
          )
        }
        return null
      case 3:
        return (
          <PaymentStep 
            formData={state}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {getCurrentStep()}
    </div>
  )
}