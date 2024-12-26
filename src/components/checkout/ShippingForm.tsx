import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

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
  email?: string;
}

export function ShippingForm({ onSubmit, email = '' }: ShippingFormProps) {
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
  })

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
    toast({
      title: "¡Perfecto!",
      description: "Continuando con el proceso de pago...",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre completo</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Juan Pérez" 
                  {...field} 
                  className="transition-all duration-200 focus:scale-[1.01]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="juan@ejemplo.com" 
                    {...field} 
                    className="transition-all duration-200 focus:scale-[1.01]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="55 1234 5678" 
                    {...field} 
                    className="transition-all duration-200 focus:scale-[1.01]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Calle y número" 
                  {...field} 
                  className="transition-all duration-200 focus:scale-[1.01]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ciudad</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Ciudad" 
                    {...field} 
                    className="transition-all duration-200 focus:scale-[1.01]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Estado" 
                    {...field} 
                    className="transition-all duration-200 focus:scale-[1.01]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código Postal</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="12345" 
                    {...field} 
                    className="transition-all duration-200 focus:scale-[1.01]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary animate-gradient"
        >
          Continuar
        </Button>
      </form>
    </Form>
  );
}