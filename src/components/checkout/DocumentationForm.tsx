import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { useEffect } from "react"
import { motion } from "framer-motion"
import { documentationFormSchema, type DocumentationFormValues } from "./documentation/types"
import { DocumentationFormFields } from "./documentation/DocumentationFormFields"
import { useCheckout } from "@/contexts/CheckoutContext"

interface DocumentationFormProps {
  onSubmit: (values: DocumentationFormValues) => void
  onValidityChange?: (isValid: boolean) => void
  initialData?: Partial<DocumentationFormValues>
  isTestMode?: boolean
  testData?: Partial<DocumentationFormValues>
}

export function DocumentationForm({ 
  onSubmit, 
  onValidityChange, 
  initialData,
  isTestMode,
  testData 
}: DocumentationFormProps) {
  const { updateCustomerInfo, updateOrderInfo } = useCheckout()
  
  const form = useForm<DocumentationFormValues>({
    resolver: zodResolver(documentationFormSchema),
    defaultValues: {
      passportNumber: initialData?.passportNumber || "",
      birthDate: initialData?.birthDate || new Date(),
      gender: initialData?.gender || undefined,
      activationDate: initialData?.activationDate || new Date(),
    },
    mode: "onChange"
  })

  useEffect(() => {
    const subscription = form.watch(() => {
      const isValid = form.formState.isValid
      console.log("Form state changed:", { 
        isValid, 
        errors: form.formState.errors,
        values: form.getValues() 
      })
      
      if (onValidityChange) {
        onValidityChange(isValid)
      }

      // Actualizar el contexto con los valores del formulario
      const formValues = form.getValues()
      updateCustomerInfo({
        passport_number: formValues.passportNumber,
        birth_date: formValues.birthDate?.toISOString(),
        gender: formValues.gender
      })
      updateOrderInfo({
        activation_date: formValues.activationDate?.toISOString()
      })
    })

    return () => subscription.unsubscribe()
  }, [form, onValidityChange, updateCustomerInfo, updateOrderInfo])

  useEffect(() => {
    if (isTestMode && testData) {
      Object.entries(testData).forEach(([key, value]) => {
        if (value) {
          form.setValue(key as keyof DocumentationFormValues, value)
        }
      })
      form.trigger()
    }
  }, [isTestMode, testData, form])

  const handleSubmit = form.handleSubmit((data) => {
    if (onSubmit) {
      onSubmit(data)
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <DocumentationFormFields form={form} />
        </motion.div>
      </form>
    </Form>
  )
}