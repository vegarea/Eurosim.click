import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useCheckout } from "@/contexts/CheckoutContext"
import { useEffect } from "react"
import { ShippingFormValues } from "../shipping/types"

const personalInfoSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(1, "El teléfono es requerido"),
  shipping_address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    postal_code: z.string(),
    phone: z.string()
  }).optional()
})

export const useCheckoutForm = (initialData?: Partial<ShippingFormValues>) => {
  const { state, updateCustomerInfo } = useCheckout()
  
  const form = useForm<ShippingFormValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: initialData?.name || state.customerInfo.name || "",
      email: initialData?.email || state.customerInfo.email || "",
      phone: initialData?.phone || state.customerInfo.phone || "",
      shipping_address: initialData?.shipping_address || {
        street: "",
        city: "",
        state: "",
        country: "Mexico",
        postal_code: "",
        phone: ""
      }
    }
  })

  // Sincronizar cambios del formulario con el contexto
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name) {
        console.log(`Campo ${name} cambió:`, value)
        const formValues = form.getValues()
        console.log("Valores actuales del formulario:", formValues)
        
        updateCustomerInfo({
          ...state.customerInfo,
          name: formValues.name,
          email: formValues.email,
          phone: formValues.phone,
          ...(formValues.shipping_address && {
            default_shipping_address: formValues.shipping_address
          })
        })
      }
    })

    return () => subscription.unsubscribe()
  }, [form, updateCustomerInfo, state.customerInfo])

  return form
}