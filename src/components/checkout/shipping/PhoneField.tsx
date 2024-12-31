import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import { UseFormReturn } from "react-hook-form"
import { ShippingFormValues } from "./types"
import { useEffect } from "react"

interface PhoneFieldProps {
  form: UseFormReturn<ShippingFormValues>
}

export function PhoneField({ form }: PhoneFieldProps) {
  // Efecto para validar el teléfono cuando el componente se monta
  useEffect(() => {
    if (form.getValues("phone")) {
      form.trigger("phone")
    }
  }, [form])

  return (
    <FormField
      control={form.control}
      name="phone"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Teléfono</FormLabel>
          <FormControl>
            <PhoneInput
              country="mx"
              value={field.value?.replace("+", "") || ""}
              onChange={(phone) => {
                const formattedPhone = "+" + phone
                field.onChange(formattedPhone)
                // Forzar la validación inmediatamente
                setTimeout(() => {
                  form.trigger("phone")
                }, 0)
              }}
              onBlur={() => {
                field.onBlur()
                form.trigger("phone")
              }}
              inputClass="w-full p-2 border rounded-md"
              containerClass="w-full"
              specialLabel=""
              disableCountryCode={false}
              countryCodeEditable={false}
              enableSearch={false}
              preferredCountries={['mx']}
              isValid={!form.formState.errors.phone}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}