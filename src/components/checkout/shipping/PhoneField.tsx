import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Phone } from "lucide-react"
import { UseFormReturn } from "react-hook-form"
import { ShippingFormValues } from "./types"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

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
              country={'mx'}
              value={field.value}
              onChange={(phone) => field.onChange(phone)}
              inputClass="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-[52px]"
              containerClass="relative"
              buttonClass="absolute top-0 left-0 bottom-0 border-r rounded-l-md px-2 flex items-center justify-center bg-background border border-input"
              searchClass="!w-full"
              dropdownClass="!w-full"
              enableSearch={true}
              disableSearchIcon={true}
              placeholder="1234567890"
            />
          </FormControl>
          <FormMessage />
          <p className="text-sm text-gray-500 mt-1">
            Selecciona el país e ingresa el número sin el código de país
          </p>
        </FormItem>
      )}
    />
  )
}