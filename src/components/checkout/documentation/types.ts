import { z } from "zod"

export const documentationFormSchema = z.object({
  fullName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  birthDate: z.date({
    required_error: "La fecha de nacimiento es requerida",
  }),
  gender: z.string().min(1, "El género es requerido"),
  passportNumber: z.string().min(1, "El número de pasaporte es requerido"),
  activationDate: z.date({
    required_error: "La fecha de activación es requerida",
  }).min(new Date(), "La fecha debe ser futura"),
  email: z.string().email("Email inválido").optional(),
  phone: z.string().optional()
})

export type DocumentationFormValues = z.infer<typeof documentationFormSchema>

export interface DocumentationFormProps {
  onSubmit: (values: DocumentationFormValues) => void
  onValidityChange?: (isValid: boolean) => void
  initialData?: Partial<DocumentationFormValues>
  isTestMode?: boolean
  testData?: {
    fullName: string
    birthDate: Date
    gender: string
    passportNumber: string
    activationDate: Date
    email: string
    phone: string
  }
}