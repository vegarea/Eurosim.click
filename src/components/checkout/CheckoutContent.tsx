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
    console.group('Inicialización del Componente');
    const savedData = JSON.parse(sessionStorage.getItem('checkoutData') || '{}');
    console.log("🔄 Datos iniciales cargados desde sessionStorage:", savedData);
    
    if (Object.keys(savedData).length > 0) {
      console.log("📝 Actualizando estado con datos guardados");
      Object.entries(savedData).forEach(([key, value]) => {
        onUpdateField(key, value);
      });
    } else {
      console.warn("⚠️ No se encontraron datos guardados en sessionStorage");
    }
    console.groupEnd();
  }, []); 

  const persistFormData = (values: any) => {
    console.group('Persistencia de Datos');
    try {
      console.log("📥 Valores recibidos para guardar:", values);
      const currentData = JSON.parse(sessionStorage.getItem('checkoutData') || '{}');
      console.log("🔄 Datos actuales en sessionStorage:", currentData);
      
      const updatedData = {
        ...currentData,
        ...values,
        email: values.email || currentData.email,
        fullName: values.fullName || currentData.fullName,
        phone: values.phone || currentData.phone
      };

      console.log("📝 Guardando datos actualizados en sessionStorage:", updatedData);
      sessionStorage.setItem('checkoutData', JSON.stringify(updatedData));
      
      Object.entries(updatedData).forEach(([key, value]) => {
        onUpdateField(key, value);
      });

      console.log("✅ Datos guardados exitosamente");
      console.groupEnd();
      return updatedData;
    } catch (error) {
      console.error("❌ Error al persistir datos:", error);
      console.groupEnd();
      toast.error("Error al guardar los datos del formulario");
      return null;
    }
  };

  const handleFormSubmit = (values: any) => {
    console.group(`Manejo de Submit - Paso ${step}`);
    console.log("📥 Valores recibidos del formulario:", values);
    
    const persistedData = persistFormData(values);
    if (!persistedData) {
      console.error("❌ Error al persistir datos");
      console.groupEnd();
      return;
    }

    console.log("✅ Datos persistidos exitosamente:", persistedData);

    if (step < 3) {
      console.log("➡️ Avanzando al siguiente paso");
      onFormSubmit(persistedData);
    } else {
      console.log("🔍 Validación final antes de procesar pago");
      if (!persistedData.email) {
        console.error("❌ Email requerido no encontrado en los datos");
        toast.error("El email es requerido para completar la orden");
        console.groupEnd();
        return;
      }
      console.log("✅ Validación final exitosa, procesando pago");
      onFormSubmit(persistedData);
      console.log("🗑️ Limpiando sessionStorage después del pago");
      sessionStorage.removeItem('checkoutData');
    }
    console.groupEnd();
  };

  const getSavedFormData = () => {
    console.group('Recuperación de Datos Guardados');
    try {
      const savedData = JSON.parse(sessionStorage.getItem('checkoutData') || '{}');
      console.log("📤 Datos recuperados:", savedData);
      console.groupEnd();
      return savedData;
    } catch (error) {
      console.error("❌ Error al recuperar datos:", error);
      console.groupEnd();
      return {};
    }
  };

  // Log al cambiar de paso
  React.useEffect(() => {
    console.group(`Cambio de Paso - ${step}`);
    console.log("📊 Estado actual del formData:", formData);
    console.log("💾 Datos en sessionStorage:", JSON.parse(sessionStorage.getItem('checkoutData') || '{}'));
    console.groupEnd();
  }, [step, formData]);

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
      console.group('Paso Final - Verificación de Datos');
      console.log("📋 Datos para paso final:", savedData);
      
      if (!savedData.email) {
        console.error("❌ Email no encontrado en datos guardados");
        toast.error("Información incompleta. Por favor, revise los pasos anteriores.");
        console.groupEnd();
        return null;
      }
      
      console.log("✅ Datos completos para procesar pago");
      console.groupEnd();
      
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