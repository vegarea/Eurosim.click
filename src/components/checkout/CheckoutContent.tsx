import React from "react"
import { DocumentationForm } from "./DocumentationForm"
import { ShippingForm } from "./ShippingForm"
import { PaymentStep } from "./PaymentStep"
import { ShippingFormValues } from "./shipping/types"
import { DocumentationFormValues } from "./documentation/types"

interface CheckoutContentProps {
  step: number;
  hasPhysicalSim: boolean;
  isTestMode: boolean;
  testData: {
    shipping: ShippingFormValues;
    documentation: DocumentationFormValues;
  };
  onFormSubmit: (values: any) => void;
  onFormValidityChange: (isValid: boolean) => void;
  formData: Record<string, any>;
  onUpdateField: (field: string, value: any) => void;
}

export function CheckoutContent({
  step,
  hasPhysicalSim,
  isTestMode,
  testData,
  onFormSubmit,
  onFormValidityChange,
  formData,
  onUpdateField
}: CheckoutContentProps) {
  // Asegurarnos que el email se mantenga entre pasos
  const handleFormSubmit = (values: any) => {
    console.log("Form submitted with values:", values);
    // Preservar el email si existe
    const updatedValues = {
      ...values,
      email: values.email || formData.email // Mantener el email existente si no viene en values
    };
    console.log("Updated values with preserved email:", updatedValues);
    onFormSubmit(updatedValues);
  };

  React.useEffect(() => {
    if (step === 3) {
      // Validar que tengamos el email antes de permitir el pago
      const isValid = !!formData.email;
      console.log("Payment step validation:", { isValid, email: formData.email });
      onFormValidityChange(isValid);
    }
  }, [step, formData.email, onFormValidityChange]);

  switch (step) {
    case 1:
      if (hasPhysicalSim) {
        return (
          <ShippingForm
            onSubmit={handleFormSubmit}
            onValidityChange={onFormValidityChange}
            isTestMode={isTestMode}
            testData={testData.shipping}
            initialData={formData} // Pasar datos existentes
          />
        )
      }
      return (
        <DocumentationForm
          onSubmit={handleFormSubmit}
          onValidityChange={onFormValidityChange}
          isTestMode={isTestMode}
          testData={testData.documentation}
          initialData={formData} // Pasar datos existentes
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
            initialData={formData} // Pasar datos existentes
          />
        )
      }
      return null
    case 3:
      return (
        <PaymentStep 
          formData={formData}
          onSubmit={() => handleFormSubmit(formData)}
        />
      )
    default:
      return null
  }
}