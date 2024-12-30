import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface DocumentationFormProps {
  onSubmit: (data: any) => void;
  onValidityChange: (isValid: boolean) => void;
  defaultValues?: any;
  isTestMode?: boolean;
}

export function DocumentationForm({
  onSubmit,
  onValidityChange,
  defaultValues,
  isTestMode = false,
}: DocumentationFormProps) {
  const form = useForm({
    defaultValues: defaultValues || {
      fullName: "",
      birthDate: new Date(),
      gender: "",
      passportNumber: "",
      activationDate: new Date(),
      email: "",
      phone: "",
    },
  });

  const { formState } = form;

  useEffect(() => {
    const subscription = form.watch(() => {
      const event = new CustomEvent('checkout-log', {
        detail: {
          type: 'form-state-change',
          data: {
            isValid: formState.isValid,
            errors: formState.errors,
            values: form.getValues()
          }
        }
      });
      window.dispatchEvent(event);
    });
    return () => subscription.unsubscribe();
  }, [form, formState]);

  return (
    <form
      onSubmit={form.handleSubmit((data) => {
        onSubmit(data);
      })}
      className="space-y-4"
    >
      <div>
        <Label htmlFor="fullName">Nombre completo</Label>
        <Input
          id="fullName"
          {...form.register("fullName", { required: true })}
        />
      </div>

      <div>
        <Label htmlFor="birthDate">Fecha de nacimiento</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start">
              {format(form.watch("birthDate") || new Date(), "dd/MM/yyyy", { locale: es })}
              <CalendarIcon className="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              mode="single"
              selected={form.watch("birthDate")}
              onSelect={(date) => form.setValue("birthDate", date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <Label htmlFor="gender">Género</Label>
        <Select
          onValueChange={(value) => form.setValue("gender", value)}
          defaultValue={form.watch("gender")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un género" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="M">Masculino</SelectItem>
            <SelectItem value="F">Femenino</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="passportNumber">Número de pasaporte</Label>
        <Input
          id="passportNumber"
          {...form.register("passportNumber", { required: true })}
        />
      </div>

      <div>
        <Label htmlFor="activationDate">Fecha de activación</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start">
              {format(form.watch("activationDate") || new Date(), "dd/MM/yyyy", { locale: es })}
              <CalendarIcon className="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              mode="single"
              selected={form.watch("activationDate")}
              onSelect={(date) => form.setValue("activationDate", date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <Label htmlFor="email">Correo electrónico</Label>
        <Input
          id="email"
          type="email"
          {...form.register("email", { required: true })}
        />
      </div>

      <div>
        <Label htmlFor="phone">Teléfono</Label>
        <Input
          id="phone"
          {...form.register("phone", { required: true })}
        />
      </div>

      <Button type="submit" className="w-full">
        {isTestMode ? "Activar prueba" : "Enviar"}
      </Button>
    </form>
  );
}
