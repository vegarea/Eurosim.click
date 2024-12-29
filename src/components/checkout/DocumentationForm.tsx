import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { useEffect } from "react"
import { motion } from "framer-motion"
import { documentationFormSchema, type DocumentationFormValues } from "./documentation/types"
import { PersonalInfoFields } from "./documentation/PersonalInfoFields"
import { DateFields } from "./documentation/DateFields"
import { GenderField } from "./documentation/GenderField"
import { PassportField } from "./documentation/PassportField"

interface DocumentationFormProps {
  onSubmit: (values: DocumentationFormValues) => void;
  onValidityChange?: (isValid: boolean) => void;
  initialData?: DocumentationFormValues;
  isPhysicalSim?: boolean;
}

export function DocumentationForm({ 
  onSubmit, 
  onValidityChange, 
  initialData,
  isPhysicalSim = false
}: DocumentationFormProps) {
  const form = useForm<DocumentationFormValues>({
    resolver: zodResolver(documentationFormSchema),
    defaultValues: {
      fullName: initialData?.fullName || "",
      birthDate: initialData?.birthDate || new Date(),
      gender: initialData?.gender || "",
      passportNumber: initialData?.passportNumber || "",
      activationDate: initialData?.activationDate || new Date(),
    },
    mode: "onChange"
  });

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      const isValid = form.formState.isValid;
      console.log("Form state changed:", { 
        isValid, 
        errors: form.formState.errors,
        values: value 
      });
      
      if (onValidityChange) {
        onValidityChange(isValid);
      }
    });

    return () => subscription.unsubscribe();
  }, [form, onValidityChange]);

  useEffect(() => {
    if (initialData) {
      Object.entries(initialData).forEach(([key, value]) => {
        form.setValue(key as keyof DocumentationFormValues, value);
      });
      
      form.trigger().then((isValid) => {
        if (onValidityChange) {
          onValidityChange(isValid);
        }
      });
    }
  }, [initialData, form, onValidityChange]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-700 text-sm">
            Para cumplir con las regulaciones de la Unión Europea y poder asignarte un número local europeo,
            necesitamos algunos datos adicionales. Esta información es requerida por las autoridades de telecomunicaciones.
          </p>
        </div>

        <div className="space-y-6">
          <PersonalInfoFields form={form} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
            <DateFields 
              form={form} 
              isPhysicalSim={isPhysicalSim} 
              type="birth"
              label="Fecha de nacimiento"
            />
            <DateFields 
              form={form} 
              isPhysicalSim={isPhysicalSim} 
              type="activation"
              label="Fecha de activación"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
            <GenderField form={form} />
            <PassportField form={form} />
          </div>
        </div>
      </form>
    </Form>
  );
}