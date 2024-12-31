import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { useState, useEffect } from "react"
import { PersonalInfoFields } from "./shipping/PersonalInfoFields"
import { AddressAutocomplete } from "./shipping/AddressAutocomplete"
import { LocationFields } from "./shipping/LocationFields"
import { z } from "zod"
import { ShippingFormValues } from "./shipping/types"

const shippingFormSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(1, "El teléfono es requerido"),
  shipping_address: z.object({
    street: z.string().min(1, "La dirección es requerida"),
    city: z.string().min(1, "La ciudad es requerida"),
    state: z.string().min(1, "El estado es requerido"),
    country: z.string().min(1, "El país es requerido"),
    postal_code: z.string().min(1, "El código postal es requerido"),
    phone: z.string().min(1, "El teléfono es requerido")
  })
})

interface ShippingFormProps {
  onSubmit: (values: ShippingFormValues) => void;
  onValidityChange?: (isValid: boolean) => void;
  email?: string;
  initialData?: {
    name?: string;
    email?: string;
    phone?: string;
    shipping_address?: any;
  };
  isTestMode?: boolean;
  testData?: Partial<ShippingFormValues>;
}

export function ShippingForm({ 
  onSubmit, 
  onValidityChange, 
  email = '', 
  initialData,
  isTestMode,
  testData
}: ShippingFormProps) {
  const form = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingFormSchema),
    defaultValues: {
      email: email || initialData?.email || "",
      name: initialData?.name || "",
      phone: initialData?.phone || "",
      shipping_address: initialData?.shipping_address || {
        street: "",
        city: "",
        state: "",
        country: "Mexico",
        postal_code: "",
        phone: ""
      }
    },
    mode: "onChange"
  })

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      console.log('ShippingForm - Form Changed:', { value, name, type })
      const formState = form.formState
      const isValid = formState.isValid && !formState.isSubmitting
      console.log('ShippingForm - Form Valid:', isValid)
      onValidityChange?.(isValid)
    })
    return () => subscription.unsubscribe()
  }, [form, onValidityChange])

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
        <PersonalInfoFields form={form} />
        <AddressAutocomplete form={form} />
        <LocationFields form={form} />
      </form>
    </Form>
  )
}