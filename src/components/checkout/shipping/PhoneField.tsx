import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Phone, Check } from "lucide-react"
import { UseFormReturn } from "react-hook-form"
import { ShippingFormValues } from "./types"
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

interface PhoneFieldProps {
  form: UseFormReturn<ShippingFormValues>
}

export function PhoneField({ form }: PhoneFieldProps) {
  const [isValid, setIsValid] = useState(false)

  const handlePhoneChange = (value: string | undefined) => {
    form.setValue('phone', value || '', { 
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
    setIsValid(!!value && isValidPhoneNumber(value))
  }

  // Validar el número inicial si existe
  useEffect(() => {
    const currentValue = form.getValues('phone')
    if (currentValue) {
      setIsValid(isValidPhoneNumber(currentValue))
    }
  }, [form])

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
                  "relative",
                  isValid && "PhoneInput--valid"
                )}
                placeholder="Ingresa tu número con código de país"
              />
              {isValid && (
                <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}