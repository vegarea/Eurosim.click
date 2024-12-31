import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Building, Map, MapPin } from "lucide-react"
import { UseFormReturn } from "react-hook-form"

interface LocationFieldsProps {
  form: UseFormReturn<any>;
}

export function LocationFields({ form }: LocationFieldsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <FormField
        control={form.control}
        name="shipping_address.city"
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

      <FormField
        control={form.control}
        name="shipping_address.state"
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

      <FormField
        control={form.control}
        name="shipping_address.postal_code"
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
    </div>
  )
}