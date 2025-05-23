import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, CreditCard } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { UseFormReturn } from "react-hook-form"
import { DocumentationFormValues } from "./types"
import { BirthDatePicker } from "./BirthDatePicker"
import { useState } from "react"

interface DocumentationFormFieldsProps {
  form: UseFormReturn<DocumentationFormValues>
}

export function DocumentationFormFields({ form }: DocumentationFormFieldsProps) {
  const [birthDateOpen, setBirthDateOpen] = useState(false)
  const [activationDateOpen, setActivationDateOpen] = useState(false)

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Fecha de nacimiento</FormLabel>
              <Popover open={birthDateOpen} onOpenChange={setBirthDateOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
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
                  <BirthDatePicker
                    value={field.value}
                    onChange={(date) => {
                      field.onChange(date)
                      // Solo cerramos el calendario cuando se selecciona un día específico
                      if (date.getDate() !== field.value?.getDate()) {
                        setBirthDateOpen(false)
                      }
                    }}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormField
            control={form.control}
            name="activationDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  Fecha de activación
                </FormLabel>
                <Popover open={activationDateOpen} onOpenChange={setActivationDateOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
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
                  <PopoverContent className="w-auto p-0 bg-white shadow-md" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date)
                        setActivationDateOpen(false)
                      }}
                      disabled={(date) =>
                        date < new Date()
                      }
                      initialFocus
                      className="rounded-md border p-3"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="bg-[#F2FCE2] border border-green-200 rounded-lg p-2">
            <p className="text-xs text-green-700">
              La fecha de activación es cuando empezarás a usar tu SIM en Europa. A partir de esta fecha tendrás disponible tu plan de datos.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}