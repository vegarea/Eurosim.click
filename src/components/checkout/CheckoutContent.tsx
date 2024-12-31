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
      console.log("Datos acumulados antes del pago:", formData);
      onFormValidityChange(true);
    }
  }, [step, onFormValidityChange, formData]);

  const handleShippingSubmit = (values: ShippingFormValues) => {
    // Asegurarnos de que todos los campos necesarios estén presentes
    const shipping_address = {
      street: values.address || "",
      city: values.city || "",
      state: values.state || "",
      postal_code: values.zipCode || "",
      phone: values.phone || ""
    };

    console.log("Dirección de envío estructurada:", shipping_address);

    const combinedData = {
      ...formData,
      email: values.email,
      fullName: values.fullName,
      phone: values.phone,
      shipping_address
    };
    
    console.log("Datos de envío guardados:", combinedData);
    onFormSubmit(combinedData);
  };

  const handleDocumentationSubmit = (values: DocumentationFormValues) => {
    // Asegurarnos de mantener la dirección de envío existente
    const shipping_address = formData.shipping_address || {};
    
    const combinedData = {
      ...formData,
      fullName: values.fullName,
      birthDate: values.birthDate,
      gender: values.gender,
      passportNumber: values.passportNumber,
      activationDate: values.activationDate,
      shipping_address
    };
    
    console.log("Datos de documentación guardados:", combinedData);
    onFormSubmit(combinedData);
  };

  switch (step) {
    case 1:
      if (hasPhysicalSim) {
        return (
          <ShippingForm
            onSubmit={handleShippingSubmit}
            onValidityChange={onFormValidityChange}
            initialData={formData}
          />
        );
      }
      return (
        <DocumentationForm
          onSubmit={handleDocumentationSubmit}
          onValidityChange={onFormValidityChange}
          initialData={formData}
        />
      );
    case 2:
      if (hasPhysicalSim) {
        return (
          <DocumentationForm
            onSubmit={handleDocumentationSubmit}
            onValidityChange={onFormValidityChange}
            initialData={formData}
          />
        );
      }
      return null;
    case 3:
      return (
        <PaymentStep 
          formData={formData}
          onSubmit={() => {
            console.log("Datos finales antes del pago:", formData);
            if (!formData.shipping_address) {
              console.error("Error: shipping_address es undefined");
              return;
            }
            onFormSubmit(formData);
          }}
        />
      );
    default:
      return null;
  }
}