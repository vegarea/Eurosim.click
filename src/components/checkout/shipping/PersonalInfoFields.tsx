import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { User, Mail } from "lucide-react"
import { UseFormReturn } from "react-hook-form"
import { motion } from "framer-motion"
import { ShippingFormValues } from "./types"
import { PhoneField } from "./PhoneField"

interface PersonalInfoFieldsProps {
  form: UseFormReturn<ShippingFormValues>
}

export function PersonalInfoFields({ form }: PersonalInfoFieldsProps) {
  const handleInputChange = (field: keyof ShippingFormValues, value: string) => {
    console.log(`PersonalInfoFields - Campo ${field} cambió:`, value);
    form.setValue(field, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <FormField
          control={form.control}
          name="name"
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
                  onChange={(e) => {
                    field.onChange(e);
                    handleInputChange('name', e.target.value);
                  }}
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
                    onChange={(e) => {
                      field.onChange(e);
                      handleInputChange('email', e.target.value);
                    }}
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
          <PhoneField form={form} />
        </motion.div>
      </div>
    </>
  )
}