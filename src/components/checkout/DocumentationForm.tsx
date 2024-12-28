import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form } from "@/components/ui/form"
import { useEffect } from "react"
import { DocumentationFormProps } from "./types/checkoutTypes"
import { PersonalInfoFields } from "./documentation/PersonalInfoFields"
import { DateFields } from "./documentation/DateFields"
import { DocumentValidationForm } from "@/components/admin/documentation/types/WorkflowTypes"

const formSchema = z.object({
  fullName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  passportNumber: z.string().min(6, "El número de pasaporte debe tener al menos 6 caracteres")
    .max(20, "El número de pasaporte no puede exceder 20 caracteres")
    .regex(/^[A-Z0-9]+$/, "El número de pasaporte solo puede contener letras mayúsculas y números"),
  gender: z.enum(['M', 'F'], {
    required_error: "El género es requerido",
  }),
  birthDate: z.date({
    required_error: "La fecha de nacimiento es requerida",
  }),
  activationDate: z.date({
    required_error: "La fecha de activación es requerida",
  }).min(new Date(), "La fecha debe ser futura"),
})

export function DocumentationForm({ onSubmit, onValidityChange, initialData }: DocumentationFormProps) {
  const form = useForm<DocumentValidationForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: initialData?.fullName || "",
      passportNumber: initialData?.passportNumber || "",
      gender: initialData?.gender || 'M',
      birthDate: initialData?.birthDate || new Date(),
      activationDate: initialData?.activationDate || new Date(),
    },
    mode: "onChange"
  })

  useEffect(() => {
    const subscription = form.watch(() => {
      if (onValidityChange) {
        onValidityChange(form.formState.isValid);
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form, onValidityChange]);

  return (
    <Form {...form}>
      <form className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-700 text-sm">
            Para cumplir con las regulaciones de la Unión Europea y poder asignarte un número local europeo,
            necesitamos algunos datos adicionales. Esta información es requerida por las autoridades de telecomunicaciones.
          </p>
        </div>

        <PersonalInfoFields form={form} />
        <DateFields form={form} />
      </form>
    </Form>
  )
}