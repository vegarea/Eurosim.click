import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { User, CreditCard, Users } from "lucide-react"
import { motion } from "framer-motion"
import { UseFormReturn } from "react-hook-form"
import { DocumentValidationForm } from "@/components/admin/documentation/types/WorkflowTypes"

interface PersonalInfoFieldsProps {
  form: UseFormReturn<DocumentValidationForm>;
}

export function PersonalInfoFields({ form }: PersonalInfoFieldsProps) {
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
                  placeholder="Como aparece en tu pasaporte" 
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
          name="passportNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Número de Pasaporte
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="Ingresa tu número de pasaporte" 
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
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Género
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="M" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Masculino
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="F" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Femenino
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>
    </div>
  )
}