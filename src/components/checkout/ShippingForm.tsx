import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form } from "@/components/ui/form"
import { useEffect } from "react"
import { ShippingFormProps } from "./types/checkoutTypes"
import { AddressFields } from "./shipping/AddressFields"
import { ContactFields } from "./shipping/ContactFields"

const formSchema = z.object({
  fullName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Número de teléfono inválido"),
  street: z.string().min(5, "Dirección inválida"),
  city: z.string().min(2, "Ciudad inválida"),
  state: z.string().min(2, "Estado inválido"),
  postalCode: z.string().min(5, "Código postal inválido"),
  country: z.string().min(2, "País inválido"),
})

export function ShippingForm({ onSubmit, onValidityChange, initialData }: ShippingFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: initialData?.fullName || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      street: initialData?.street || "",
      city: initialData?.city || "",
      state: initialData?.state || "",
      postalCode: initialData?.postalCode || "",
      country: initialData?.country || "España",
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
        <ContactFields form={form} />
        <AddressFields form={form} />
      </form>
    </Form>
  )
}