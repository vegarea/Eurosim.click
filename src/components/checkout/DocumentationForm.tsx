import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect } from "react"
import { motion } from "framer-motion"
import { User, Calendar, CreditCard, Mail, Phone } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { documentationFormSchema, type DocumentationFormValues } from "./documentation/types"

interface DocumentationFormProps {
  onSubmit: (values: DocumentationFormValues) => void;
  onValidityChange?: (isValid: boolean) => void;
  initialData?: Partial<DocumentationFormValues>;
  isTestMode?: boolean;
  testData?: Partial<DocumentationFormValues>;
}

export function DocumentationForm({ 
  onSubmit, 
  onValidityChange, 
  initialData,
  isTestMode,
  testData 
}: DocumentationFormProps) {
  const form = useForm<DocumentationFormValues>({
    resolver: zodResolver(documentationFormSchema),
    defaultValues: {
      fullName: initialData?.fullName || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      birthDate: initialData?.birthDate || new Date(),
      gender: initialData?.gender || undefined,
      passportNumber: initialData?.passportNumber || "",
      activationDate: initialData?.activationDate || new Date(),
    },
    mode: "onChange"
  })

  // Watch all form fields for changes
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

  // If initialData is provided, update form values
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

  const handleSubmit = form.handleSubmit((data) => {
    if (onSubmit) {
      onSubmit(data);
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-700 text-sm">
            Para cumplir con las regulaciones de la Unión Europea y poder asignarte un número local europeo,
            necesitamos algunos datos adicionales. Esta información es requerida por las autoridades de telecomunicaciones.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
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
                  <FormLabel className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="email"
                      placeholder="tu@email.com" 
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
                  <FormLabel className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Teléfono
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="tel"
                      placeholder="+52 55 1234 5678" 
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
            name="birthDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Fecha de nacimiento
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-10 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: es })
                        ) : (
                          <span>Selecciona una fecha</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                      className="bg-white"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Género</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona tu género" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="M">Masculino</SelectItem>
                    <SelectItem value="F">Femenino</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

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
                    className="transition-all duration-200 focus:scale-[1.01]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="activationDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  Fecha de activación
                </FormLabel>
                <p className="text-sm text-muted-foreground mb-2">
                  Elige la fecha de tu llegada a Europa. A partir de esta fecha se activará tu plan de datos.
                </p>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-10 text-left font-normal bg-primary/5 border-primary/20",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: es })
                        ) : (
                          <span>Selecciona una fecha</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date()
                      }
                      initialFocus
                      className="bg-white"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>
      </form>
    </Form>
  );
}
