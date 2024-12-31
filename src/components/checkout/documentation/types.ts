import { z } from "zod"

export const documentationFormSchema = z.object({
  passportNumber: z.string().min(1, "El número de pasaporte es requerido"),
  birthDate: z.date({
    required_error: "La fecha de nacimiento es requerida",
  }),
  gender: z.enum(["M", "F"], {
    required_error: "El género es requerido"
  }),
  activationDate: z.date({
    required_error: "La fecha de activación es requerida",
  }).min(new Date(), "La fecha debe ser futura"),
})

export type DocumentationFormValues = z.infer<typeof documentationFormSchema>