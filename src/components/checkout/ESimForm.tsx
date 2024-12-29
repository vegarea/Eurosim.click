import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useEffect } from "react"
import { motion } from "framer-motion"
import { User, Mail, Phone } from "lucide-react"

const formSchema = z.object({
  fullName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Número de teléfono inválido"),
})

interface ESimFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  onValidityChange?: (isValid: boolean) => void;
  initialData?: {
    fullName: string;
    email: string;
    phone: string;
  };
}

export function ESimForm({ onSubmit, onValidityChange, initialData }: ESimFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: initialData?.fullName || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
    },
    mode: "onChange"
  });

  // Validar cambios en el formulario
  useEffect(() => {
    const subscription = form.watch(() => {
      const formState = form.getValues();
      const hasAllFields = formState.fullName && formState.email && formState.phone;
      const isValid = form.formState.isValid && hasAllFields;
      
      console.log("ESimForm: Form state changed", {
        values: formState,
        errors: form.formState.errors,
        isValid,
        isDirty: form.formState.isDirty,
        hasAllFields
      });

      if (onValidityChange) {
        onValidityChange(isValid);
      }
    });

    return () => subscription.unsubscribe();
  }, [form, onValidityChange]);

  // Validar datos iniciales
  useEffect(() => {
    if (initialData) {
      Object.entries(initialData).forEach(([key, value]) => {
        form.setValue(key as keyof z.infer<typeof formSchema>, value, {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true
        });
      });

      // Forzar validación inicial
      form.trigger().then((isValid) => {
        const formState = form.getValues();
        const hasAllFields = formState.fullName && formState.email && formState.phone;
        
        console.log("ESimForm: Initial validation", {
          isValid,
          hasAllFields,
          values: formState
        });

        if (onValidityChange) {
          onValidityChange(isValid && hasAllFields);
        }
      });
    }
  }, [initialData, form, onValidityChange]);

  return (
    <Form {...form}>
      <form className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Nombre completo
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Juan Pérez" 
                    {...field} 
                    className="transition-all duration-200 focus:scale-[1.01] pl-10"
                    onBlur={() => {
                      field.onBlur();
                      form.trigger("fullName");
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="juan@ejemplo.com" 
                    {...field} 
                    className="transition-all duration-200 focus:scale-[1.01] pl-10"
                    onBlur={() => {
                      field.onBlur();
                      form.trigger("email");
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Teléfono
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="55 1234 5678" 
                    {...field} 
                    className="transition-all duration-200 focus:scale-[1.01] pl-10"
                    onBlur={() => {
                      field.onBlur();
                      form.trigger("phone");
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>
      </form>
    </Form>
  );
}