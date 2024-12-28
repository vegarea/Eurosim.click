import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Building, Map, MapPin } from "lucide-react"
import { UseFormReturn } from "react-hook-form"
import { motion } from "framer-motion"
import { ShippingFormValues } from "./types"

interface LocationFieldsProps {
  form: UseFormReturn<ShippingFormValues>
}

export function LocationFields({ form }: LocationFieldsProps) {
  return (
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
  )
}