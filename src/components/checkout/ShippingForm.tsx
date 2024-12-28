import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form } from "@/components/ui/form"
import { useEffect } from "react"
import { ShippingFormProps } from "./types/checkoutTypes"
import { AddressFields } from "./shipping/AddressFields"
import { ContactFields } from "./shipping/ContactFields"
import { useCart } from "@/contexts/CartContext"

// Schema condicional basado en el tipo de producto
const getFormSchema = (isPhysicalSim: boolean) => {
  const baseSchema = {
    fullName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    phone: z.string().min(10, "Número de teléfono inválido"),
  };

  if (isPhysicalSim) {
    return z.object({
      ...baseSchema,
      street: z.string().min(5, "Dirección inválida"),
      city: z.string().min(2, "Ciudad inválida"),
      state: z.string().min(2, "Estado inválido"),
      postalCode: z.string().min(5, "Código postal inválido"),
      country: z.string().min(2, "País inválido"),
    });
  }

  return z.object(baseSchema);
};

export function ShippingForm({ onSubmit, onValidityChange, initialData }: ShippingFormProps) {
  const { items } = useCart();
  const isPhysicalSim = items.some(item => item.type === 'physical');
  
  const formSchema = getFormSchema(isPhysicalSim);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: initialData?.fullName || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      ...(isPhysicalSim ? {
        street: initialData?.street || "",
        city: initialData?.city || "",
        state: initialData?.state || "",
        postalCode: initialData?.postalCode || "",
        country: initialData?.country || "España",
      } : {})
    },
    mode: "onChange"
  });

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
        {isPhysicalSim && <AddressFields form={form} />}
      </form>
    </Form>
  );
}