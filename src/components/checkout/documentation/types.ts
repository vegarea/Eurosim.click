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
  })
})

export type DocumentationFormValues = z.infer<typeof documentationFormSchema>