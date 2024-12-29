import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Phone, Check } from "lucide-react"
import { UseFormReturn } from "react-hook-form"
import { ShippingFormValues } from "./types"
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { cn } from "@/lib/utils"
import { useState } from "react"

interface PhoneFieldProps {
  form: UseFormReturn<ShippingFormValues>
}

export function PhoneField({ form }: PhoneFieldProps) {
  const [isValid, setIsValid] = useState(false)

  const handlePhoneChange = (value: string | undefined) => {
    form.setValue('phone', value || '', { shouldValidate: true })
    setIsValid(!!value && isValidPhoneNumber(value))
  }

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
            <div className="relative">
              <PhoneInput
                international
                defaultCountry="MX"
                value={field.value}
                onChange={handlePhoneChange}
                className={cn(
                  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                  isValid && "pr-10 border-green-500"
                )}
                placeholder="Enter phone number"
              />
              {isValid && (
                <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
              )}
            </div>
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