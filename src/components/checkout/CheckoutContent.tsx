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

  // Función para guardar datos en sessionStorage de forma segura
  const saveToSessionStorage = (data: Record<string, any>) => {
    try {
      const sanitizedData = Object.entries(data).reduce((acc, [key, value]) => {
        // Asegurarse de que solo guardamos valores primitivos o objetos simples
        if (value !== null && value !== undefined) {
          acc[key] = value;
        }
        return acc;
      }, {} as Record<string, any>);

      console.log("🔄 Guardando en sessionStorage:", sanitizedData);
      sessionStorage.setItem('checkoutData', JSON.stringify(sanitizedData));
      return true;
    } catch (error) {
      console.error("❌ Error al guardar en sessionStorage:", error);
      return false;
    }
  };

  // Función para cargar datos de sessionStorage de forma segura
  const loadFromSessionStorage = () => {
    try {
      const savedData = sessionStorage.getItem('checkoutData');
      if (!savedData) {
        console.log("ℹ️ No hay datos guardados en sessionStorage");
        return {};
      }
      const parsedData = JSON.parse(savedData);
      console.log("📤 Datos cargados de sessionStorage:", parsedData);
      return parsedData;
    } catch (error) {
      console.error("❌ Error al cargar de sessionStorage:", error);
      return {};
    }
  };

  // Cargar datos guardados al montar el componente
  React.useEffect(() => {
    const savedData = loadFromSessionStorage();
    if (Object.keys(savedData).length > 0) {
      Object.entries(savedData).forEach(([key, value]) => {
        onUpdateField(key, value);
      });
      console.log("✅ Datos restaurados al estado:", savedData);
    }
  }, []);

  const persistFormData = (values: Record<string, any>) => {
    // Combinar datos existentes con nuevos valores
    const currentData = loadFromSessionStorage();
    const updatedData = {
      ...currentData,
      ...values,
      // Asegurar que estos campos críticos se mantengan
      email: values.email || currentData.email,
      fullName: values.fullName || currentData.fullName,
      phone: values.phone || currentData.phone
    };

    // Guardar datos actualizados
    if (saveToSessionStorage(updatedData)) {
      // Actualizar estado global
      Object.entries(updatedData).forEach(([key, value]) => {
        onUpdateField(key, value);
      });
      return updatedData;
    }
    return null;
  };

  const handleFormSubmit = (values: Record<string, any>) => {
    console.group(`Procesando submit - Paso ${step}`);
    console.log("📥 Valores recibidos:", values);

    const persistedData = persistFormData(values);
    if (!persistedData) {
      toast.error("Error al guardar los datos del formulario");
      console.groupEnd();
      return;
    }

    if (step < 3) {
      console.log("➡️ Avanzando al siguiente paso");
      onFormSubmit(persistedData);
    } else {
      console.log("🔍 Validación final");
      const allData = loadFromSessionStorage();
      console.log("📋 Datos completos para procesar:", allData);
      
      if (!allData.email) {
        toast.error("El email es requerido para completar la orden");
        console.error("❌ Email no encontrado en datos guardados");
        console.groupEnd();
        return;
      }

      onFormSubmit(allData);
      sessionStorage.removeItem('checkoutData');
      console.log("🗑️ Datos de sessionStorage limpiados después del pago");
    }
    console.groupEnd();
  };

  // Switch para renderizar el paso actual
  switch (step) {
    case 1:
      if (hasPhysicalSim) {
        return (
          <ShippingForm
            onSubmit={handleFormSubmit}
            onValidityChange={onFormValidityChange}
            isTestMode={isTestMode}
            testData={testData.shipping}
            initialData={loadFromSessionStorage()}
          />
        );
      }
      return (
        <DocumentationForm
          onSubmit={handleFormSubmit}
          onValidityChange={onFormValidityChange}
          isTestMode={isTestMode}
          testData={testData.documentation}
          initialData={loadFromSessionStorage()}
        />
      );
    case 2:
      if (hasPhysicalSim) {
        return (
          <DocumentationForm
            onSubmit={handleFormSubmit}
            onValidityChange={onFormValidityChange}
            isTestMode={isTestMode}
            testData={testData.documentation}
            initialData={loadFromSessionStorage()}
          />
        );
      }
      return null;
    case 3:
      const savedData = loadFromSessionStorage();
      if (!savedData.email) {
        toast.error("Información incompleta. Por favor, revise los pasos anteriores.");
        return null;
      }
      return (
        <PaymentStep
          formData={savedData}
          onSubmit={() => handleFormSubmit(savedData)}
        />
      );
    default:
      return null;
  }
}