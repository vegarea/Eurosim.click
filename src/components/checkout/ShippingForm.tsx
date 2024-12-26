import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useEffect } from "react"
import { motion } from "framer-motion"
import { User, Mail, Phone, MapPin, Building, Map } from "lucide-react"

const formSchema = z.object({
  fullName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Número de teléfono inválido"),
  address: z.string().min(5, "Dirección inválida"),
  city: z.string().min(2, "Ciudad inválida"),
  state: z.string().min(2, "Estado inválido"),
  zipCode: z.string().min(5, "Código postal inválido"),
})

interface ShippingFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  onValidityChange?: (isValid: boolean) => void;
  email?: string;
}

export function ShippingForm({ onSubmit, onValidityChange, email = '' }: ShippingFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: email,
      fullName: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
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
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Dirección
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Calle y número" 
                    {...field} 
                    className="transition-all duration-200 focus:scale-[1.01] pl-10"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    Ciudad
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Ciudad" 
                      {...field} 
                      className="transition-all duration-200 focus:scale-[1.01] pl-10"
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
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Map className="w-4 h-4" />
                    Estado
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Estado" 
                      {...field} 
                      className="transition-all duration-200 focus:scale-[1.01] pl-10"
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
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Código Postal
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="12345" 
                      {...field} 
                      className="transition-all duration-200 focus:scale-[1.01] pl-10"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
        </div>
      </form>
    </Form>
  );
}