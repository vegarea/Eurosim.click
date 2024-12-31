import React from "react"
import { DocumentationForm } from "./DocumentationForm"
import { ShippingForm } from "./ShippingForm"
import { PaymentStep } from "./PaymentStep"
import { ShippingFormValues } from "./shipping/types"
import { DocumentationFormValues } from "./documentation/types"
import { toast } from "sonner"

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
    console.log("Recibiendo datos del formulario de envío:", values);
    
    // Crear el objeto shipping_address con la estructura correcta
    const shipping_address = {
      street: values.address,
      city: values.city,
      state: values.state,
      postal_code: values.zipCode,
      phone: values.phone
    };

    console.log("Estructura de shipping_address creada:", shipping_address);

    const combinedData = {
      ...formData,
      email: values.email,
      fullName: values.fullName,
      phone: values.phone,
      shipping_address // Usar el nombre correcto del campo
    };
    
    console.log("Datos combinados después de shipping:", combinedData);
    onFormSubmit(combinedData);
  };

  const handleDocumentationSubmit = (values: DocumentationFormValues) => {
    console.log("Recibiendo datos del formulario de documentación:", values);
    console.log("Estado actual de formData:", formData);
    
    // Asegurarnos de mantener shipping_address existente
    const combinedData = {
      ...formData,
      fullName: values.fullName,
      birthDate: values.birthDate,
      gender: values.gender,
      passportNumber: values.passportNumber,
      activationDate: values.activationDate,
      // Mantener explícitamente shipping_address
      shipping_address: formData.shipping_address
    };
    
    console.log("Datos combinados después de documentación:", combinedData);
    onFormSubmit(combinedData);
  };

  const validateFormData = (data: Record<string, any>): boolean => {
    if (!data.shipping_address) {
      console.error("Error: shipping_address es undefined");
      toast.error("Error: Faltan datos de envío");
      return false;
    }
    
    const requiredFields = ['street', 'city', 'state', 'postal_code'];
    for (const field of requiredFields) {
      if (!data.shipping_address[field]) {
        console.error(`Error: Falta el campo ${field} en shipping_address`);
        toast.error(`Error: Falta información de envío (${field})`);
        return false;
      }
    }
    
    return true;
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
            console.log("Validando datos finales antes del pago:", formData);
            if (!validateFormData(formData)) {
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