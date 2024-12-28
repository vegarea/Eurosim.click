import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function PaymentStep() {
  const [selectedMethod, setSelectedMethod] = useState<string>("stripe");

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <RadioGroup
          defaultValue="stripe"
          onValueChange={setSelectedMethod}
          className="grid gap-4"
        >
          {/* Stripe Option */}
          <div>
            <RadioGroupItem
              value="stripe"
              id="stripe"
              className="peer sr-only"
            />
            <Label
              htmlFor="stripe"
              className={cn(
                "flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer",
              )}
            >
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg"
                    alt="Stripe"
                    className="h-6 object-contain"
                  />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Pagar con tarjeta
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Débito o Crédito
                    </p>
                  </div>
                </div>
              </div>
            </Label>
          </div>

          {/* PayPal Option */}
          <div>
            <RadioGroupItem
              value="paypal"
              id="paypal"
              className="peer sr-only"
              disabled
            />
            <Label
              htmlFor="paypal"
              className={cn(
                "flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-not-allowed opacity-60",
              )}
            >
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="https://cdn.worldvectorlogo.com/logos/paypal-3.svg"
                    alt="PayPal"
                    className="h-6 object-contain"
                  />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Pagar con PayPal
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Próximamente
                    </p>
                  </div>
                </div>
              </div>
            </Label>
          </div>
        </RadioGroup>

        {selectedMethod === "paypal" && (
          <Alert variant="info" className="bg-blue-50 border-blue-200 mt-4">
            <InfoIcon className="h-4 w-4 text-blue-500" />
            <AlertDescription className="text-blue-700">
              El pago con PayPal no está disponible en este momento. Por favor, selecciona otro método de pago.
            </AlertDescription>
          </Alert>
        )}

        {selectedMethod === "stripe" && (
          <div className="mt-6 space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">
                Serás redirigido a Stripe para completar tu pago de forma segura. Después del pago exitoso, serás redirigido a la página de confirmación.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}