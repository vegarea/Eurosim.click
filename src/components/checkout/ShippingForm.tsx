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
  
  console.log('ShippingForm - Initial Data:', initialData)
  
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

  console.log('ShippingForm - Form Values:', form.watch())

  // Observar cambios en los campos requeridos para validación
  useEffect(() => {
    const subscription = form.watch((value) => {
      console.log('ShippingForm - Form Changed:', value)
      const hasRequiredFields = !!(
        value.fullName && 
        value.email && 
        value.phone && 
        form.formState.errors.fullName === undefined &&
        form.formState.errors.email === undefined &&
        form.formState.errors.phone === undefined
      );
      console.log('ShippingForm - Form Valid:', hasRequiredFields)
      onValidityChange?.(hasRequiredFields);
    });
    return () => subscription.unsubscribe();
  }, [form, onValidityChange]);

  // Si estamos en modo test y tenemos datos de prueba, los usamos
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
    
    form.setValue('address', fullAddress, { shouldValidate: true })
    if (city) form.setValue('city', city, { shouldValidate: true })
    if (state) form.setValue('state', state, { shouldValidate: true })
    if (postalCode) form.setValue('zipCode', postalCode, { shouldValidate: true })
    
    setShowLocationFields(true)
  }

  const handleSubmit = (values: ShippingFormValues) => {
    console.log('ShippingForm - Submitting Values:', values)
    const shippingAddress: Json = values.address ? {
      street: values.address,
      city: values.city,
      state: values.state,
      postal_code: values.zipCode,
      phone: values.phone
    } : null;

    console.log('ShippingForm - Formatted Shipping Address:', shippingAddress)
    onSubmit({
      ...values,
      shippingAddress
    } as unknown as ShippingFormValues)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <PersonalInfoFields form={form} />
        
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <AddressAutocomplete
              value={field.value}
              onChange={field.onChange}
              onAddressSelect={handleAddressSelect}
            />
          )}
        />

        <LocationFields form={form} show={showLocationFields} />
      </form>
    </Form>
  )
}