import { Form } from "@/components/ui/form"
import { useEffect } from "react"
import { AddressAutocomplete } from "./shipping/AddressAutocomplete"
import { LocationFields } from "./shipping/LocationFields"
import { ShippingFormValues } from "./shipping/types"
import { UseFormReturn } from "react-hook-form"

interface ShippingFormProps {
  form: UseFormReturn<ShippingFormValues>;
  onSubmit: (values: ShippingFormValues) => void;
  onValidityChange?: (isValid: boolean) => void;
  initialData?: {
    name?: string;
    email?: string;
    phone?: string;
    shipping_address?: any;
  };
  isTestMode?: boolean;
  testData?: Partial<ShippingFormValues>;
  skipPersonalInfo?: boolean;
}

export function ShippingForm({ 
  form,
  onSubmit, 
  onValidityChange, 
  initialData,
  isTestMode,
  testData,
  skipPersonalInfo = false
}: ShippingFormProps) {
  useEffect(() => {
    if (isTestMode && testData) {
      console.log('ShippingForm - Setting Test Data:', testData)
      Object.entries(testData).forEach(([key, value]) => {
        if (value) {
          form.setValue(key as keyof ShippingFormValues, value as any)
        }
      })
    }
  }, [isTestMode, testData, form])

  const handleSubmit = (values: ShippingFormValues) => {
    console.log('ShippingForm - Submitting Values:', values)
    onSubmit(values)
  }

  return (
    <Form {...form}>
      <form 
        id="shipping-form"
        onSubmit={form.handleSubmit(handleSubmit)} 
        className="space-y-6"
      >
        <AddressAutocomplete form={form} />
        <LocationFields form={form} />
      </form>
    </Form>
  )
}