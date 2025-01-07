import React from "react"
import { DocumentationForm } from "./DocumentationForm"
import { ShippingForm } from "./ShippingForm"
import { PaymentStep } from "./PaymentStep"
import { useCheckout } from "@/contexts/CheckoutContext"
import { ShippingFormValues } from "./shipping/types"
import { DocumentationFormValues } from "./documentation/types"
import { format } from "date-fns"
import { Card } from "@/components/ui/card"
import { PersonalInfoFields } from "./shipping/PersonalInfoFields"
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

interface CheckoutContentProps {
  step: number;
  hasPhysicalSim: boolean;
  isTestMode: boolean;
  testData: {
    shipping: ShippingFormValues;
    documentation: DocumentationFormValues;
  };
  onFormValidityChange: (isValid: boolean) => void;
}

const personalInfoSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(1, "El teléfono es requerido"),
  shipping_address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    postal_code: z.string(),
    phone: z.string()
  }).optional()
})

export function CheckoutContent({
  step,
  hasPhysicalSim,
  isTestMode,
  testData,
  onFormValidityChange,
}: CheckoutContentProps) {
  const { state, updateCustomerInfo, updateOrderInfo } = useCheckout()
  const form = useForm<ShippingFormValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: state.customerInfo.name || "",
      email: state.customerInfo.email || "",
      phone: state.customerInfo.phone || "",
      shipping_address: {
        street: "",
        city: "",
        state: "",
        country: "Mexico",
        postal_code: "",
        phone: ""
      }
    }
  })

  React.useEffect(() => {
    if (step === 3) {
      const isValid = !!state.customerInfo.email && !!state.customerInfo.name;
      console.log("Payment step validation:", { 
        isValid, 
        email: state.customerInfo.email,
        name: state.customerInfo.name,
        state: state 
      });
      onFormValidityChange(isValid);
    }
  }, [step, state.customerInfo.email, state.customerInfo.name, onFormValidityChange]);

  const handleFormSubmit = (values: any) => {
    console.log("Form submitted with values:", values);

    if (values.shippingAddress) {
      updateOrderInfo({
        shipping_address: values.shippingAddress,
        type: hasPhysicalSim ? "physical" : "esim"
      })
    }

    // Formatear las fechas al formato que espera Supabase (YYYY-MM-DD)
    const formattedBirthDate = values.birthDate ? 
      format(new Date(values.birthDate), 'yyyy-MM-dd') : 
      null;

    // Para activation_date mantenemos el timestamp completo que requiere Supabase
    const formattedActivationDate = values.activationDate ? 
      new Date(values.activationDate).toISOString() : 
      null;

    const customerInfo = {
      name: values.name || values.fullName, // Soporte para ambos campos
      email: values.email,
      phone: values.phone,
      passport_number: values.passportNumber,
      birth_date: formattedBirthDate,
      gender: values.gender,
      default_shipping_address: values.shippingAddress
    };

    console.log("Updating customer info with:", customerInfo);
    updateCustomerInfo(customerInfo);

    if (formattedActivationDate) {
      updateOrderInfo({
        activation_date: formattedActivationDate
      })
    }
  }

  const getCurrentStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Información Personal</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
                  <PersonalInfoFields form={form} />
                </form>
              </Form>
            </Card>

            {hasPhysicalSim && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Dirección de Envío</h2>
                <ShippingForm
                  onSubmit={handleFormSubmit}
                  onValidityChange={onFormValidityChange}
                  isTestMode={isTestMode}
                  testData={testData.shipping}
                  initialData={state.customerInfo}
                  skipPersonalInfo={true}
                />
              </Card>
            )}
          </div>
        );
      case 2:
        return (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Documentación UE</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-700 text-sm">
                Para cumplir con las regulaciones de la Unión Europea y poder asignarte un número local europeo,
                necesitamos algunos datos adicionales. Esta información es requerida por las autoridades de telecomunicaciones.
              </p>
            </div>
            <DocumentationForm
              onSubmit={handleFormSubmit}
              onValidityChange={onFormValidityChange}
              isTestMode={isTestMode}
              testData={testData.documentation}
              initialData={state.customerInfo}
            />
          </Card>
        );
      case 3:
        return (
          <PaymentStep 
            formData={state}
          />
        );
      default:
        return null;
    }
  }

  return (
    <div className="space-y-6">
      {getCurrentStep()}
    </div>
  )
}