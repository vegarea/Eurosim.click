import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CreditCard } from "lucide-react"
import { UseFormReturn } from "react-hook-form"
import { motion } from "framer-motion"
import { DocumentationFormValues } from "./types"

interface PassportFieldProps {
  form: UseFormReturn<DocumentationFormValues>
}

export function PassportField({ form }: PassportFieldProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
    >
      <FormField
        control={form.control}
        name="passportNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Número de pasaporte
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
  )
}