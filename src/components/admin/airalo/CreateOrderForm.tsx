
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AiraloPackage } from "@/types/airalo/api-types";
import { useAiraloClient } from "@/hooks/useAiraloClient";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, PackageOpen } from "lucide-react";

const formSchema = z.object({
  packageId: z.string().min(1, "Seleccione un paquete"),
  quantity: z.coerce.number().int().min(1).max(50),
  description: z.string().optional(),
  brandSettingsName: z.string().optional(),
  contactPoint: z.string().email().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface CreateOrderFormProps {
  packages: AiraloPackage[];
  onOrderCreated?: () => void;
}

export function CreateOrderForm({ packages, onOrderCreated }: CreateOrderFormProps) {
  const { toast } = useToast();
  const { submitOrder } = useAiraloClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [useBranding, setUseBranding] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      packageId: "",
      quantity: 1,
      description: "",
      brandSettingsName: "",
      contactPoint: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    try {
      const result = await submitOrder({
        packageId: values.packageId,
        quantity: values.quantity,
        description: values.description,
        brandSettingsName: useBranding ? values.brandSettingsName : undefined,
        contactPoint: values.contactPoint || undefined,
      });

      if (result) {
        toast({
          title: "Pedido creado exitosamente",
          description: `Pedido #${result.code} creado.`,
        });
        form.reset();
        if (onOrderCreated) {
          onOrderCreated();
        }
      } else {
        toast({
          title: "Error al crear pedido",
          description: "No se pudo crear el pedido. Inténtalo nuevamente.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error creating order:", error);
      toast({
        title: "Error al crear pedido",
        description: "Ocurrió un error inesperado. Por favor, inténtalo nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PackageOpen className="h-5 w-5" />
          Crear Nuevo Pedido
        </CardTitle>
        <CardDescription>
          Crea un nuevo pedido de eSIM a través de la API de Airalo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="packageId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paquete de eSIM</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un paquete" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {packages.map((pkg) => (
                        <SelectItem key={pkg.id} value={pkg.package_id}>
                          {pkg.name} - {pkg.data} - {pkg.day} días - ${pkg.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    El paquete de datos que se activará para este eSIM.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cantidad</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="1" min={1} max={50} {...field} />
                  </FormControl>
                  <FormDescription>
                    Cantidad de eSIM a ordenar (máximo 50).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Input placeholder="Descripción del pedido (opcional)" {...field} />
                  </FormControl>
                  <FormDescription>
                    Una descripción opcional para identificar este pedido.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactPoint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Punto de Contacto</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="email@ejemplo.com (opcional)" {...field} />
                  </FormControl>
                  <FormDescription>
                    Email para recibir notificaciones sobre este pedido.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="use-branding" 
                  checked={useBranding} 
                  onCheckedChange={(checked) => setUseBranding(checked === true)}
                />
                <label
                  htmlFor="use-branding"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Usar marca personalizada
                </label>
              </div>
              {useBranding && (
                <FormField
                  control={form.control}
                  name="brandSettingsName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de la Marca</FormLabel>
                      <FormControl>
                        <Input placeholder="Nombre de tu marca" {...field} />
                      </FormControl>
                      <FormDescription>
                        Nombre de la marca que se mostrará en el eSIM.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Procesando...
                </>
              ) : (
                "Crear Pedido"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
