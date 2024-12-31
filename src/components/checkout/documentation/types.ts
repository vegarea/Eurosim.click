import { z } from "zod"
import { CustomerGender } from "@/types/database/enums"

// Este schema coincide exactamente con la estructura de la tabla customers en Supabase
export const documentationFormSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().nullable(),
  passport_number: z.string().min(6, "Número de pasaporte inválido"),
  birth_date: z.date(),
  gender: z.enum(["M", "F"] as const).nullable(),
  activation_date: z.date()
})

export type DocumentationFormValues = z.infer<typeof documentationFormSchema>