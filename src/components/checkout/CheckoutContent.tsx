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
  React.useEffect(() => {
    if (step === 3) {
      onFormValidityChange(true);
    }
  }, [step, onFormValidityChange]);

  const handleFormSubmit = (values: any) => {
    // Guardar en sessionStorage
    const currentData = JSON.parse(sessionStorage.getItem('checkoutData') || '{}');
    const updatedData = { ...currentData, ...values };
    sessionStorage.setItem('checkoutData', JSON.stringify(updatedData));
    
    // Actualizar formData con todos los datos acumulados
    Object.entries(updatedData).forEach(([key, value]) => {
      onUpdateField(key, value);
    });

    onFormSubmit(updatedData);
  };

  switch (step) {
    case 1:
      if (hasPhysicalSim) {
        return (
          <ShippingForm
            onSubmit={handleFormSubmit}
            onValidityChange={onFormValidityChange}
            isTestMode={isTestMode}
            testData={testData.shipping}
            initialData={JSON.parse(sessionStorage.getItem('checkoutData') || '{}')}
          />
        )
      }
      return (
        <DocumentationForm
          onSubmit={handleFormSubmit}
          onValidityChange={onFormValidityChange}
          isTestMode={isTestMode}
          testData={testData.documentation}
          initialData={JSON.parse(sessionStorage.getItem('checkoutData') || '{}')}
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
            initialData={JSON.parse(sessionStorage.getItem('checkoutData') || '{}')}
          />
        )
      }
      return null
    case 3:
      // Recuperar todos los datos almacenados
      const savedData = JSON.parse(sessionStorage.getItem('checkoutData') || '{}');
      return (
        <PaymentStep 
          formData={savedData}
          onSubmit={() => {
            onFormSubmit(savedData);
            // Limpiar storage después de procesar el pago
            sessionStorage.removeItem('checkoutData');
          }}
        />
      )
    default:
      return null
  }
}