import { z } from "zod"
import { Json } from "@/types/database/common"

export const shippingAddressSchema = z.object({
  street: z.string().min(1, "La dirección es requerida"),
  city: z.string().min(1, "La ciudad es requerida"),
  state: z.string().min(1, "El estado es requerido"),
  postal_code: z.string().min(1, "El código postal es requerido"),
  phone: z.string().min(1, "El teléfono es requerido"),
})

export const shippingFormSchema = z.object({
  fullName: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(1, "El teléfono es requerido"),
  address: z.string().min(1, "La dirección es requerida"),
  city: z.string().min(1, "La ciudad es requerida"),
  state: z.string().min(1, "El estado es requerido"),
  zipCode: z.string().min(1, "El código postal es requerido"),
})

export type ShippingAddress = z.infer<typeof shippingAddressSchema>
export type ShippingFormValues = z.infer<typeof shippingFormSchema>

export interface ShippingFormProps {
  onSubmit: (values: ShippingFormValues & { shipping_address: Json }) => void
  onValidityChange?: (isValid: boolean) => void
  email?: string
  initialData?: Partial<ShippingFormValues>
}