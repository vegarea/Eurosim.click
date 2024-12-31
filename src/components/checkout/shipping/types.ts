import { z } from "zod"
import { Json } from "@/types/database/common"

// Este schema coincide con la estructura de shipping_address en la tabla orders
export const shippingFormSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Número de teléfono inválido"),
  address: z.string().min(5, "La dirección es requerida"),
  city: z.string().min(2, "La ciudad es requerida"),
  state: z.string().min(2, "El estado es requerido"),
  postal_code: z.string().min(5, "Código postal inválido")
})

export type ShippingFormValues = z.infer<typeof shippingFormSchema>

export interface ShippingFormProps {
  onSubmit: (values: ShippingFormValues) => void
  onValidityChange?: (isValid: boolean) => void
  email?: string
  initialData?: ShippingFormValues
  isTestMode?: boolean
  testData?: Partial<ShippingFormValues>
}

// Tipo que coincide con el formato de shipping_address en la tabla orders
export type ShippingAddress = {
  street: string
  city: string
  state: string
  country: string
  postal_code: string
  phone: string
} & Json