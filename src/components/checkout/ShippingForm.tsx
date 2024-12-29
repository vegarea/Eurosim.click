import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { useState, useEffect } from "react"
import { PersonalInfoFields } from "./shipping/PersonalInfoFields"
import { AddressAutocomplete } from "./shipping/AddressAutocomplete"
import { LocationFields } from "./shipping/LocationFields"
import { shippingFormSchema, type ShippingFormValues } from "./shipping/types"
import { Json } from "@/types/database/common"

interface ShippingFormProps {
  onSubmit: (values: ShippingFormValues) => void
  onValidityChange?: (isValid: boolean) => void
  email?: string
  initialData?: ShippingFormValues
}

export function ShippingForm({ 
  onSubmit, 
  onValidityChange, 
  email = '', 
  initialData 
}: ShippingFormProps) {
  const [showLocationFields, setShowLocationFields] = useState(false)
  
  const form = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingFormSchema),
    defaultValues: {
      email: email || initialData?.email || "",
      fullName: initialData?.fullName || "",
      phone: initialData?.phone || "",
      address: initialData?.address || "",
      city: initialData?.city || "",
      state: initialData?.state || "",
      zipCode: initialData?.zipCode || "",
    },
    mode: "onChange"
  })

  // Observar cambios en la validez del formulario
  useEffect(() => {
    console.log("Form state changed:", {
      isDirty: form.formState.isDirty,
      isValid: form.formState.isValid,
      errors: form.formState.errors
    });
    
    onValidityChange?.(form.formState.isValid);
  }, [form.formState, onValidityChange]);

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
    
    form.setValue('address', fullAddress, { shouldValidate: true })
    if (city) form.setValue('city', city, { shouldValidate: true })
    if (state) form.setValue('state', state, { shouldValidate: true })
    if (postalCode) form.setValue('zipCode', postalCode, { shouldValidate: true })
    
    setShowLocationFields(true)
  }

  const handleFormSubmit = (values: ShippingFormValues) => {
    console.log("Form submitted with values:", values);
    const shippingAddress: Json = {
      street: values.address,
      city: values.city,
      state: values.state,
      postal_code: values.zipCode,
      phone: values.phone
    }

    onSubmit({
      ...values,
      shippingAddress
    } as unknown as ShippingFormValues)
  }

  return (
    <Form {...form}>
      <div className="space-y-6">
        <PersonalInfoFields form={form} />
        
        <AddressAutocomplete
          value={form.getValues("address")}
          onChange={(value) => form.setValue("address", value, { shouldValidate: true })}
          onAddressSelect={handleAddressSelect}
        />

        <LocationFields form={form} show={showLocationFields} />
      </div>
    </Form>
  )
}