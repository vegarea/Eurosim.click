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
  // Cargar datos guardados al montar el componente
  React.useEffect(() => {
    const savedData = JSON.parse(sessionStorage.getItem('checkoutData') || '{}');
    console.log("Datos iniciales cargados:", savedData);
    
    // Actualizar el estado global con los datos guardados
    if (Object.keys(savedData).length > 0) {
      Object.entries(savedData).forEach(([key, value]) => {
        onUpdateField(key, value);
      });
    }
  }, []); // Solo al montar

  const persistFormData = (values: any) => {
    try {
      // Obtener datos existentes
      const currentData = JSON.parse(sessionStorage.getItem('checkoutData') || '{}');
      
      // Combinar con nuevos datos, manteniendo datos anteriores
      const updatedData = {
        ...currentData,
        ...values,
        // Asegurar que estos campos críticos se preserven
        email: values.email || currentData.email,
        fullName: values.fullName || currentData.fullName,
        phone: values.phone || currentData.phone
      };

      console.log("Guardando datos en sessionStorage:", updatedData);
      sessionStorage.setItem('checkoutData', JSON.stringify(updatedData));
      
      // Actualizar estado global
      Object.entries(updatedData).forEach(([key, value]) => {
        onUpdateField(key, value);
      });

      return updatedData;
    } catch (error) {
      console.error("Error al persistir datos:", error);
      toast.error("Error al guardar los datos del formulario");
      return null;
    }
  };

  const handleFormSubmit = (values: any) => {
    const persistedData = persistFormData(values);
    if (!persistedData) return;

    if (step < 3) {
      onFormSubmit(persistedData);
    } else {
      // Validación final
      if (!persistedData.email) {
        toast.error("El email es requerido para completar la orden");
        return;
      }
      onFormSubmit(persistedData);
      // Limpiar storage después de procesar el pago
      sessionStorage.removeItem('checkoutData');
    }
  };

  // Recuperar datos guardados para cada formulario
  const getSavedFormData = () => {
    try {
      return JSON.parse(sessionStorage.getItem('checkoutData') || '{}');
    } catch {
      return {};
    }
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
            initialData={getSavedFormData()}
          />
        )
      }
      return (
        <DocumentationForm
          onSubmit={handleFormSubmit}
          onValidityChange={onFormValidityChange}
          isTestMode={isTestMode}
          testData={testData.documentation}
          initialData={getSavedFormData()}
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
            initialData={getSavedFormData()}
          />
        )
      }
      return null
    case 3:
      const savedData = getSavedFormData();
      console.log("Datos para paso final:", savedData);
      
      if (!savedData.email) {
        console.error("Email no encontrado en datos guardados");
        toast.error("Información incompleta. Por favor, revise los pasos anteriores.");
        return null;
      }
      
      return (
        <PaymentStep 
          formData={savedData}
          onSubmit={() => {
            handleFormSubmit(savedData);
          }}
        />
      )
    default:
      return null
  }
}