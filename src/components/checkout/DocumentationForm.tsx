import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form } from "@/components/ui/form"
import { useEffect } from "react"
import { DocumentationFormProps } from "./types/checkoutTypes"
import { PersonalInfoFields } from "./documentation/PersonalInfoFields"
import { DateFields } from "./documentation/DateFields"
import { DocumentValidationForm } from "@/components/admin/documentation/types/checkout/CheckoutTypes"

const formSchema = z.object({
  fullName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  birthDate: z.date({
    required_error: "La fecha de nacimiento es requerida",
  }),
  gender: z.enum(['M', 'F'], {
    required_error: "El género es requerido",
  }),
  passportNumber: z.string().min(1, "El número de pasaporte es requerido"),
  activationDate: z.date({
    required_error: "La fecha de activación es requerida",
  }).min(new Date(), "La fecha debe ser futura"),
})

export function DocumentationForm({ onSubmit, onValidityChange, initialData }: DocumentationFormProps) {
  const form = useForm<DocumentValidationForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: initialData?.fullName || "",
      birthDate: initialData?.birthDate || new Date(),
      gender: initialData?.gender || 'M',
      passportNumber: initialData?.passportNumber || "",
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
    
    return () => {
      if (subscription && typeof subscription === 'function') {
        subscription();
      }
    };
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