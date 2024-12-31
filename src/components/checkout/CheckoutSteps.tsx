import React from "react"
import { DocumentationForm } from "./DocumentationForm"
import { ShippingForm } from "./ShippingForm"
import { PaymentStep } from "./PaymentStep"
import { useCheckout } from "@/contexts/CheckoutContext"
import { ShippingFormValues } from "./shipping/types"
import { DocumentationFormValues } from "./documentation/types"

interface CheckoutStepsProps {
  step: number;
  hasPhysicalSim: boolean;
  isTestMode: boolean;
  testData: {
    shipping: ShippingFormValues;
    documentation: DocumentationFormValues;
  };
  onFormValidityChange: (isValid: boolean) => void;
}

export function CheckoutSteps({
  step,
  hasPhysicalSim,
  isTestMode,
  testData,
  onFormValidityChange,
}: CheckoutStepsProps) {
  const { state, updateCustomerInfo, updateOrderInfo } = useCheckout()

  console.log('CheckoutSteps - Current Step:', step)
  console.log('CheckoutSteps - Current State:', state)

  React.useEffect(() => {
    if (step === 3) {
      const isValid = !!state.customerInfo.email;
      console.log("Payment step validation:", { isValid, email: state.customerInfo.email });
      onFormValidityChange(isValid);
    }
  }, [step, state.customerInfo.email, onFormValidityChange]);

  const handleFormSubmit = (values: any) => {
    console.log('CheckoutSteps - Form Submit Values:', values)
    
    if (values.shippingAddress) {
      updateOrderInfo({
        shipping_address: values.shippingAddress,
        type: hasPhysicalSim ? "physical" : "esim"
      })
    }

    updateCustomerInfo({
      name: values.fullName,
      email: values.email,
      phone: values.phone,
      passport_number: values.passportNumber,
      birth_date: values.birthDate,
      gender: values.gender,
      default_shipping_address: values.shippingAddress
    })

    console.log('CheckoutSteps - After Update State:', state)
  }

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