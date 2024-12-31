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

interface DocumentationFormFieldsProps {
  form: UseFormReturn<DocumentationFormValues>
}

export function DocumentationFormFields({ form }: DocumentationFormFieldsProps) {
  return (
    <>
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
        name="birthDate"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Fecha de nacimiento</FormLabel>
            <Popover>
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
                <div className="p-3 bg-white rounded-md border shadow-md">
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Año</label>
                      <Select
                        value={field.value ? field.value.getFullYear().toString() : "1990"}
                        onValueChange={(year) => {
                          const newDate = new Date(field.value || new Date())
                          newDate.setFullYear(parseInt(year))
                          field.onChange(newDate)
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 84 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Mes</label>
                      <Select
                        value={field.value ? (field.value.getMonth() + 1).toString() : "1"}
                        onValueChange={(month) => {
                          const newDate = new Date(field.value || new Date())
                          newDate.setMonth(parseInt(month) - 1)
                          field.onChange(newDate)
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 12 }, (_, i) => {
                            const date = new Date(2000, i, 1)
                            return (
                              <SelectItem key={i + 1} value={(i + 1).toString()}>
                                {format(date, "MMMM", { locale: es })}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1940-01-01")
                    }
                    defaultMonth={field.value || new Date(1990, 0)}
                    className="rounded-md"
                  />
                </div>
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
                  onSelect={field.onChange}
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
    </>
  )
}