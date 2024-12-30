import { z } from "zod"
import { isValidPhoneNumber } from 'react-phone-number-input'

export const shippingFormSchema = z.object({
  fullName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string()
    .min(1, "El teléfono es requerido")
    .refine((value) => isValidPhoneNumber(value), {
      message: "Número de teléfono inválido"
    }),
  address: z.string().min(5, "Dirección inválida"),
  city: z.string().min(2, "Ciudad inválida"),
  state: z.string().min(2, "Estado inválido"),
  zipCode: z.string().min(5, "Código postal inválido"),
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