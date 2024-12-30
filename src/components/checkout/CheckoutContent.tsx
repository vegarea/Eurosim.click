import { DocumentationForm } from "./DocumentationForm"
import { ShippingForm } from "./ShippingForm"
import { ReviewStep } from "./ReviewStep"
import { ShippingFormValues } from "./shipping/types"
import { Json } from "@/types/database/common"

interface CheckoutContentProps {
  step: number
  hasPhysicalSim: boolean
  isTestMode: boolean
  testData: {
    shipping: ShippingFormValues
    documentation: {
      fullName: string
      birthDate: Date
      gender: string
      passportNumber: string
      activationDate: Date
      email: string
      phone: string
    }
  }
  onFormSubmit: (values: any) => void
  onFormValidityChange: (isValid: boolean) => void
  formData: Record<string, any>
  onUpdateField: (field: string, value: any) => void
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
  switch (step) {
    case 1:
      if (hasPhysicalSim) {
        return (
          <ShippingForm
            onSubmit={onFormSubmit}
            onValidityChange={onFormValidityChange}
            isTestMode={isTestMode}
            testData={testData.shipping}
          />
        )
      }
      return (
        <DocumentationForm
          onSubmit={onFormSubmit}
          onValidityChange={onFormValidityChange}
          isTestMode={isTestMode}
          testData={testData.documentation}
        />
      )
    case 2:
      if (hasPhysicalSim) {
        return (
          <DocumentationForm
            onSubmit={onFormSubmit}
            onValidityChange={onFormValidityChange}
            isTestMode={isTestMode}
            testData={testData.documentation}
          />
        )
      }
      return (
        <ReviewStep
          formData={formData}
          onUpdateField={onUpdateField}
        />
      )
    case 3:
      return (
        <ReviewStep
          formData={formData}
          onUpdateField={onUpdateField}
        />
      )
    default:
      return null
  }
}