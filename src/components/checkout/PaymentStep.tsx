import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function PaymentStep() {
  const [selectedMethod, setSelectedMethod] = useState<string>("test");

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <RadioGroup
          defaultValue="test"
          onValueChange={setSelectedMethod}
          className="grid gap-4"
        >
          {/* Test Payment Option */}
          <div>
            <RadioGroupItem
              value="test"
              id="test"
              className="peer sr-only"
            />
            <Label
              htmlFor="test"
              className={cn(
                "flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer",
              )}
            >
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <InfoIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Pago de prueba
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Solo para testing
                    </p>
                  </div>
                </div>
              </div>
            </Label>
          </div>

          {/* Stripe Option - Disabled for now */}
          <div>
            <RadioGroupItem
              value="stripe"
              id="stripe"
              className="peer sr-only"
              disabled
            />
            <Label
              htmlFor="stripe"
              className={cn(
                "flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-not-allowed opacity-60",
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
                      Próximamente
                    </p>
                  </div>
                </div>
              </div>
            </Label>
          </div>

          {/* PayPal Option - Disabled */}
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

        {selectedMethod === "test" && (
          <Alert className="bg-yellow-50 border-yellow-200 mt-4">
            <InfoIcon className="h-4 w-4 text-yellow-500" />
            <AlertDescription className="text-yellow-700">
              Este es un método de pago de prueba. El pedido se procesará automáticamente como pagado.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}