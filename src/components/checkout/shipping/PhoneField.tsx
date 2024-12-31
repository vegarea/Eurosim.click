import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import { UseFormReturn } from "react-hook-form"
import { ShippingFormValues } from "./types"

interface PhoneFieldProps {
  form: UseFormReturn<ShippingFormValues>
}

export function PhoneField({ form }: PhoneFieldProps) {
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
              value={field.value}
              onChange={(phone) => {
                field.onChange("+" + phone)
              }}
              inputClass="w-full p-2 border rounded-md"
              containerClass="w-full"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}