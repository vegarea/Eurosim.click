import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { User, Mail, Phone } from "lucide-react"
import { motion } from "framer-motion"
import { UseFormReturn } from "react-hook-form"

interface ContactFieldsProps {
  form: UseFormReturn<any>;
}

export function ContactFields({ form }: ContactFieldsProps) {
  return (
    <div className="space-y-4">
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
                  placeholder="Como aparece en tu documento" 
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
                  placeholder="tu@email.com" 
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
                  placeholder="+34 612 345 678" 
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
  );
}