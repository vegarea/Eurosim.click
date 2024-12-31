import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormField } from "@/components/ui/form"
import { useState, useEffect } from "react"
import { PersonalInfoFields } from "./shipping/PersonalInfoFields"
import { AddressAutocomplete } from "./shipping/AddressAutocomplete"
import { LocationFields } from "./shipping/LocationFields"
import { shippingFormSchema, type ShippingFormValues, type ShippingFormProps } from "./shipping/types"
import { Json } from "@/types/database/common"

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
      default_shipping_address: initialData?.default_shipping_address || null,
    },
    mode: "onChange"
  })

  useEffect(() => {
    const subscription = form.watch((value) => {
      console.log('ShippingForm - Form Changed:', value)
      const hasRequiredFields = !!(
        value.name && 
        value.email && 
        value.phone && 
        form.formState.errors.name === undefined &&
        form.formState.errors.email === undefined &&
        form.formState.errors.phone === undefined
      );
      console.log('ShippingForm - Form Valid:', hasRequiredFields)
      onValidityChange?.(hasRequiredFields);
    });
    return () => subscription.unsubscribe();
  }, [form, onValidityChange]);

  useEffect(() => {
    if (isTestMode && testData) {
      console.log('ShippingForm - Setting Test Data:', testData)
      Object.entries(testData).forEach(([key, value]) => {
        if (value) {
          form.setValue(key as keyof ShippingFormValues, value);
        }
      });
      setShowLocationFields(true);
    }
  }, [isTestMode, testData, form]);

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
    
    const shippingAddress: Json = {
      street: fullAddress,
      city,
      state,
      postal_code: postalCode
    }
    
    form.setValue('default_shipping_address', shippingAddress, { shouldValidate: true })
    setShowLocationFields(true)
  }

  const handleSubmit = (values: ShippingFormValues) => {
    console.log('ShippingForm - Submitting Values:', values)
    onSubmit({
      name: values.name,
      email: values.email,
      phone: values.phone,
      default_shipping_address: values.default_shipping_address
    })
  }

  return (
    <Form {...form}>
      <form 
        id="shipping-form"
        onSubmit={form.handleSubmit(handleSubmit)} 
        className="space-y-6"
      >
        <PersonalInfoFields form={form} />
        
        <FormField
          control={form.control}
          name="default_shipping_address"
          render={({ field }) => (
            <AddressAutocomplete
              value={field.value?.street || ''}
              onChange={(value) => field.onChange({ ...field.value, street: value })}
              onAddressSelect={handleAddressSelect}
            />
          )}
        />

        <LocationFields form={form} show={showLocationFields} />
      </form>
    </Form>
  )
}