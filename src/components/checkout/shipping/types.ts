import { z } from "zod"
import { isValidPhoneNumber } from 'react-phone-number-input'

export const shippingFormSchema = z.object({
  fullName: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("Email inválido"),
  phone: z.string().refine((value) => isValidPhoneNumber(value), {
    message: "Número de teléfono inválido"
  }),
  address: z.string().min(1, "La dirección es requerida"),
  city: z.string().min(1, "La ciudad es requerida"),
  state: z.string().min(1, "El estado es requerido"),
  zipCode: z.string().min(5, "Código postal inválido"),
})

export type ShippingFormValues = z.infer<typeof shippingFormSchema>