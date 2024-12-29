import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Phone } from "lucide-react"
import MexicoFlag from "@/components/icons/MexicoFlag"
import { UseFormReturn } from "react-hook-form"
import { ShippingFormValues } from "./types"

interface PhoneFieldProps {
  form: UseFormReturn<ShippingFormValues>
}

export function PhoneField({ form }: PhoneFieldProps) {
  const formatPhoneNumber = (value: string) => {
    // Eliminar todo excepto números
    const numbers = value.replace(/\D/g, '')
    
    // Si no hay números, retornar vacío
    if (numbers.length === 0) return ''
    
    // Formatear el número según la longitud
    if (numbers.length <= 2) return numbers
    if (numbers.length <= 6) return `${numbers.slice(0, 2)} ${numbers.slice(2)}`
    if (numbers.length <= 10) {
      return `${numbers.slice(0, 2)} ${numbers.slice(2, 6)} ${numbers.slice(6)}`
    }
    // Limitar a 10 dígitos
    return `${numbers.slice(0, 2)} ${numbers.slice(2, 6)} ${numbers.slice(6, 10)}`
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
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <MexicoFlag className="w-5 h-4" />
              <span className="text-sm text-gray-500">+52</span>
            </div>
            <FormControl>
              <Input
                {...field}
                className="pl-20"
                placeholder="462 111 3546"
                onChange={(e) => {
                  const formatted = formatPhoneNumber(e.target.value)
                  field.onChange(formatted)
                }}
              />
            </FormControl>
          </div>
          <FormMessage />
          <p className="text-sm text-gray-500 mt-1">
            Ejemplo: 462 111 3546 (10 dígitos)
          </p>
        </FormItem>
      )}
    />
  )
}