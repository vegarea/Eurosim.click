import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { useState, useEffect } from "react"
import { PersonalInfoFields } from "./shipping/PersonalInfoFields"
import { AddressAutocomplete } from "./shipping/AddressAutocomplete"
import { LocationFields } from "./shipping/LocationFields"
import { z } from "zod"
import { Json } from "@/types/database/common"

const shippingFormSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(1, "El teléfono es requerido"),
  default_shipping_address: z.object({
    street: z.string().min(1, "La dirección es requerida"),
    city: z.string().min(1, "La ciudad es requerida"),
    state: z.string().min(1, "El estado es requerido"),
    postal_code: z.string().min(1, "El código postal es requerido")
  }).nullable()
})

type ShippingFormValues = z.infer<typeof shippingFormSchema>

interface ShippingFormProps {
  onSubmit: (values: ShippingFormValues) => void;
  onValidityChange?: (isValid: boolean) => void;
  email?: string;
  initialData?: {
    name?: string;
    email?: string;
    phone?: string;
    default_shipping_address?: Json;
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
  const [showLocationFields, setShowLocationFields] = useState(false)
  
  const form = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingFormSchema),
    defaultValues: {
      email: email || initialData?.email || "",
      name: initialData?.name || "",
      phone: initialData?.phone || "",
      default_shipping_address: initialData?.default_shipping_address as any || null,
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
      setShowLocationFields(true)
    }
  }, [isTestMode, testData, form])

  const handleAddressSelect = (place: google.maps.places.PlaceResult) => {
    console.log("Address selected:", place)
    const addressComponents = place.address_components || []
    
    let streetNumber = ''
    let route = ''
    let city = ''
    let state = ''
    let postalCode = ''

    addressComponents.forEach(component => {
      const types = component.types

      if (types.includes('street_number')) {
        streetNumber = component.long_name
      } else if (types.includes('route')) {
        route = component.long_name
      } else if (types.includes('locality')) {
        city = component.long_name
      } else if (types.includes('administrative_area_level_1')) {
        state = component.long_name
      } else if (types.includes('postal_code')) {
        postalCode = component.long_name
      }
    })

    const fullAddress = `${streetNumber} ${route}`.trim()
    
    form.setValue('default_shipping_address', {
      street: fullAddress,
      city,
      state,
      postal_code: postalCode
    }, { shouldValidate: true })
    
    setShowLocationFields(true)
  }

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
        
        <AddressAutocomplete
          value={form.watch('default_shipping_address.street') || ''}
          onChange={(value) => 
            form.setValue('default_shipping_address.street', value, { 
              shouldValidate: true 
            })
          }
          onAddressSelect={handleAddressSelect}
        />

        <LocationFields form={form} show={showLocationFields} />
      </form>
    </Form>
  )
}