import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Smartphone } from "lucide-react";
import { BrandDevices } from "@/data/compatibleDevices";

interface DeviceVerificationProps {
  onVerify: (model: string) => void;
  compatibleDevices: BrandDevices[];
}

export function DeviceVerification({ onVerify, compatibleDevices }: DeviceVerificationProps) {
  const [deviceModel, setDeviceModel] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (deviceModel.trim()) {
      onVerify(deviceModel);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <div className="p-3 bg-primary/10 rounded-full">
          <Smartphone className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-medium">Verifica tu dispositivo</h3>
          <p className="text-sm text-gray-500">
            Ingresa el modelo de tu teléfono para verificar la compatibilidad
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="deviceModel">Modelo del dispositivo</Label>
          <Input
            id="deviceModel"
            placeholder="Ej: iPhone 14, Galaxy S23..."
            value={deviceModel}
            onChange={(e) => setDeviceModel(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full">
          Verificar Compatibilidad
        </Button>
      </form>

      <div className="space-y-4">
        <p className="text-sm text-gray-500 text-center">
          O selecciona tu dispositivo de la lista
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {compatibleDevices.map((brand) => (
            <div key={brand.name} className="space-y-2">
              <h4 className="font-medium text-sm">{brand.name}</h4>
              <div className="space-y-1">
                {brand.models.map((model) => (
                  <Button
                    key={model.name}
                    variant="ghost"
                    className="w-full justify-start text-sm"
                    onClick={() => onVerify(model.name)}
                  >
                    {model.name}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}