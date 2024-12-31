import React from "react"
import { DocumentationForm } from "./DocumentationForm"
import { ShippingForm } from "./ShippingForm"
import { PaymentStep } from "./PaymentStep"
import { ShippingFormValues } from "./shipping/types"
import { DocumentationFormValues } from "./documentation/types"
import { toast } from "sonner"

interface CheckoutContentProps {
  step: number
  hasPhysicalSim: boolean
  onFormSubmit: (values: any) => void
  onFormValidityChange: (isValid: boolean) => void
  formData: Record<string, any>
  onUpdateField: (field: string, value: any) => void
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
      console.log("CheckoutContent - Datos acumulados antes del pago:", formData)
      onFormValidityChange(true)
    }
  }, [step, onFormValidityChange, formData])

  const handleShippingSubmit = (values: ShippingFormValues) => {
    console.log("CheckoutContent - Recibiendo datos del formulario de envío:", values)
    
    // Asegurarnos de que shipping_address tenga la estructura correcta
    if (!values.shipping_address) {
      console.error("Error: shipping_address es undefined")
      toast.error("Error: Faltan datos de envío")
      return
    }

    const combinedData = {
      ...formData,
      email: values.email,
      fullName: values.fullName,
      phone: values.phone,
      shipping_address: values.shipping_address
    }
    
    console.log("CheckoutContent - Datos combinados después de shipping:", combinedData)
    onFormSubmit(combinedData)
  }

  const handleDocumentationSubmit = (values: DocumentationFormValues) => {
    console.log("CheckoutContent - Recibiendo datos del formulario de documentación:", values)
    console.log("CheckoutContent - Estado actual de formData:", formData)
    
    // Asegurarnos de mantener shipping_address existente
    const combinedData = {
      ...formData,
      ...values,
      shipping_address: formData.shipping_address // Mantener explícitamente shipping_address
    }
    
    console.log("CheckoutContent - Datos combinados después de documentación:", combinedData)
    onFormSubmit(combinedData)
  }

  switch (step) {
    case 1:
      if (hasPhysicalSim) {
        return (
          <ShippingForm
            onSubmit={handleShippingSubmit}
            onValidityChange={onFormValidityChange}
            initialData={formData}
          />
        )
      }
      return (
        <DocumentationForm
          onSubmit={handleDocumentationSubmit}
          onValidityChange={onFormValidityChange}
          initialData={formData}
          shipping_address={formData.shipping_address}
        />
      )
    case 2:
      if (hasPhysicalSim) {
        return (
          <DocumentationForm
            onSubmit={handleDocumentationSubmit}
            onValidityChange={onFormValidityChange}
            initialData={formData}
            shipping_address={formData.shipping_address}
          />
        )
      }
      return null
    case 3:
      return (
        <PaymentStep 
          formData={formData}
          onSubmit={() => {
            console.log("CheckoutContent - Validando datos finales antes del pago:", formData)
            if (!formData.shipping_address) {
              toast.error("Error: Faltan datos de envío")
              return
            }
            onFormSubmit(formData)
          }}
        />
      )
    default:
      return null
  }
}