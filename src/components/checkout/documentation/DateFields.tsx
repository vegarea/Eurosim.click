import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarIcon } from "lucide-react"
import { format, addDays, subYears } from "date-fns"
import { es } from "date-fns/locale"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { UseFormReturn } from "react-hook-form"
import { motion } from "framer-motion"
import { DocumentationFormValues } from "./types"

interface DateFieldsProps {
  form: UseFormReturn<DocumentationFormValues>;
  isPhysicalSim?: boolean;
  type: "birth" | "activation";
  label: string;
}

export function DateFields({ form, isPhysicalSim = false, type, label }: DateFieldsProps) {
  const minActivationDate = addDays(new Date(), isPhysicalSim ? 4 : 2);
  const maxBirthDate = subYears(new Date(), 18);
  const minBirthDate = subYears(new Date(), 100);

  const fieldName = type === "birth" ? "birthDate" : "activationDate";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <FormField
        control={form.control}
        name={fieldName}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel className="flex items-center gap-2 mb-2">
              <CalendarIcon className="w-4 h-4" />
              {label}
            </FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-10 text-left font-normal",
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
                {type === "birth" ? (
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > maxBirthDate || date < minBirthDate
                    }
                    defaultMonth={subYears(new Date(), 30)}
                    fromYear={1924}
                    toYear={2006}
                    captionLayout="dropdown-buttons"
                    initialFocus
                    className="bg-white"
                  />
                ) : (
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < minActivationDate}
                    initialFocus
                    className="bg-white"
                  />
                )}
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    </motion.div>
  );
}