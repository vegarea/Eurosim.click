import { z } from "zod"
import { isValidPhoneNumber } from 'react-phone-number-input'
import { Customer } from "@/types/database/customers"

export const shippingFormSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string()
    .min(1, "El teléfono es requerido")
    .refine((value) => isValidPhoneNumber(value), {
      message: "Número de teléfono inválido"
    }),
  default_shipping_address: z.any().optional(),
})

export type ShippingFormValues = z.infer<typeof shippingFormSchema>

export interface ShippingFormProps {
  onSubmit: (values: Partial<Customer>) => void
  onValidityChange?: (isValid: boolean) => void
  email?: string
  initialData?: Partial<Customer>
  isTestMode?: boolean
  testData?: Partial<Customer>
}