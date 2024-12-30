import React from "react"
import { DocumentationForm } from "./DocumentationForm"
import { ShippingForm } from "./ShippingForm"
import { PaymentStep } from "./PaymentStep"
import { ShippingFormValues } from "./shipping/types"
import { DocumentationFormValues } from "./documentation/types"

interface CheckoutContentProps {
  step: number;
  hasPhysicalSim: boolean;
  onFormSubmit: (values: any) => void;
  onFormValidityChange: (isValid: boolean) => void;
  formData: Record<string, any>;
  onUpdateField: (field: string, value: any) => void;
}

export function CheckoutContent({
  step,
  hasPhysicalSim,
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

  switch (step) {
    case 1:
      if (hasPhysicalSim) {
        return (
          <ShippingForm
            onSubmit={onFormSubmit}
            onValidityChange={onFormValidityChange}
          />
        )
      }
      return (
        <DocumentationForm
          onSubmit={onFormSubmit}
          onValidityChange={onFormValidityChange}
        />
      )
    case 2:
      if (hasPhysicalSim) {
        return (
          <DocumentationForm
            onSubmit={onFormSubmit}
            onValidityChange={onFormValidityChange}
          />
        )
      }
      return null
    case 3:
      return (
        <PaymentStep 
          formData={formData}
          onSubmit={() => onFormSubmit(formData)}
        />
      )
    default:
      return null
  }
}