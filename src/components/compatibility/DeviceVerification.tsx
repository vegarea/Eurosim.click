import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Smartphone } from "lucide-react";
import { BrandDevices } from "./devices-data";

interface DeviceVerificationProps {
  onVerify: (model: string) => void;
  compatibleDevices: BrandDevices[];
}

export function DeviceVerification({ onVerify, compatibleDevices }: DeviceVerificationProps) {
  const [deviceModel, setDeviceModel] = useState("");
  const [error, setError] = useState("");

  const handleVerify = () => {
    if (!deviceModel.trim()) {
      setError("Por favor, ingresa el modelo de tu dispositivo");
      return;
    }
    setError("");
    onVerify(deviceModel);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="device-model" className="text-sm font-medium text-gray-700">
          Modelo de tu dispositivo
        </label>
        <div className="relative">
          <Input
            id="device-model"
            value={deviceModel}
            onChange={(e) => setDeviceModel(e.target.value)}
            placeholder="Ej: iPhone 14, Samsung S23..."
            className="pl-10"
          />
          <Smartphone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>

      <Button 
        onClick={handleVerify}
        className="w-full"
      >
        Verificar Compatibilidad
      </Button>

      <div className="mt-4 text-sm text-gray-500">
        <p>Marcas compatibles:</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {compatibleDevices.map((brand) => (
            <span
              key={brand.name}
              className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
            >
              {brand.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}