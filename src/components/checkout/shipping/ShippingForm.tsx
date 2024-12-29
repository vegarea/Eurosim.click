import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormField } from "@/components/ui/form"
import { useEffect, useState } from "react"
import { PersonalInfoFields } from "./PersonalInfoFields"
import { AddressAutocomplete } from "./AddressAutocomplete"
import { LocationFields } from "./LocationFields"
import { ShippingFormValues, shippingFormSchema } from "./types"

interface ShippingFormProps {
  onSubmit: (values: ShippingFormValues) => void;
  onValidityChange?: (isValid: boolean) => void;
  email?: string;
  initialData?: ShippingFormValues;
}

export function ShippingForm({ 
  onSubmit, 
  onValidityChange, 
  email = '', 
  initialData 
}: ShippingFormProps) {
  const [showLocationFields, setShowLocationFields] = useState(false)
  
  const form = useForm<z.infer<typeof shippingFormSchema>>({
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

  // Observar cambios en el formulario y validar
  useEffect(() => {
    const subscription = form.watch(() => {
      if (onValidityChange) {
        // Verificar si todos los campos requeridos están llenos y son válidos
        const isValid = form.formState.isValid && Object.keys(form.formState.errors).length === 0;
        console.log("Form validation state:", {
          isValid,
          errors: form.formState.errors,
          values: form.getValues()
        });
        onValidityChange(isValid);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, onValidityChange]);

  // Actualizar validación cuando se cargan datos iniciales
  useEffect(() => {
    if (initialData) {
      Object.entries(initialData).forEach(([key, value]) => {
        form.setValue(key as keyof ShippingFormValues, value, { 
          shouldValidate: true,
          shouldDirty: true 
        });
      });
    }
  }, [initialData, form]);

  const handleAddressSelect = (place: google.maps.places.PlaceResult) => {
    console.log("Address selected:", place);
    const addressComponents = place.address_components || [];
    
    let streetNumber = '';
    let route = '';
    let city = '';
    let state = '';
    let postalCode = '';

    addressComponents.forEach(component => {
      const types = component.types;

      if (types.includes('street_number')) {
        streetNumber = component.long_name;
      } else if (types.includes('route')) {
        route = component.long_name;
      } else if (types.includes('locality')) {
        city = component.long_name;
      } else if (types.includes('administrative_area_level_1')) {
        state = component.long_name;
      } else if (types.includes('postal_code')) {
        postalCode = component.long_name;
      }
    });

    const fullAddress = `${streetNumber} ${route}`.trim();
    
    form.setValue('address', fullAddress, { shouldValidate: true });
    if (city) form.setValue('city', city, { shouldValidate: true });
    if (state) form.setValue('state', state, { shouldValidate: true });
    if (postalCode) form.setValue('zipCode', postalCode, { shouldValidate: true });
    
    setShowLocationFields(true);
  };

  return (
    <Form {...form}>
      <form className="space-y-6">
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
  );
}