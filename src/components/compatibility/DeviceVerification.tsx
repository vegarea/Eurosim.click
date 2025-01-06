import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface DeviceVerificationProps {
  onVerify: (model: string) => void;
}

export function DeviceVerification({ onVerify }: DeviceVerificationProps) {
  const [deviceModel, setDeviceModel] = useState("");

  const handleVerify = () => {
    if (deviceModel.trim()) {
      onVerify(deviceModel);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">
          Verifica la compatibilidad de tu dispositivo
        </h3>
        <p className="text-sm text-gray-500">
          Ingresa el modelo de tu teléfono para verificar si es compatible con eSIM
        </p>
      </div>

      <div className="flex gap-2">
        <Input
          value={deviceModel}
          onChange={(e) => setDeviceModel(e.target.value)}
          placeholder="Ej: iPhone 12, Samsung S21..."
          className="flex-1"
        />
        <Button onClick={handleVerify} disabled={!deviceModel.trim()}>
          <Search className="h-4 w-4 mr-2" />
          Verificar
        </Button>
      </div>
    </div>
  );
}