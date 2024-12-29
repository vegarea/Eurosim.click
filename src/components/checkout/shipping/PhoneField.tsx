import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Phone } from "lucide-react"
import { UseFormReturn } from "react-hook-form"
import { ShippingFormValues } from "./types"
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

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
          <FormLabel className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Teléfono
          </FormLabel>
          <FormControl>
            <PhoneInput
              international
              defaultCountry="MX"
              value={field.value}
              onChange={(value) => field.onChange(value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter phone number"
            />
          </FormControl>
          <FormMessage />
          <p className="text-sm text-gray-500 mt-1">
            Ingresa tu número con código de país
          </p>
        </FormItem>
      )}
    />
  )
}