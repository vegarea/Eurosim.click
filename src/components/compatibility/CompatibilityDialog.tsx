import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { DeviceVerification } from "./DeviceVerification";
import { DeviceChat } from "./DeviceChat";
import { compatibleDevices } from "./devices-data";

export function CompatibilityDialog({ 
  open,
  onOpenChange
}: { 
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [showChat, setShowChat] = useState(false);
  const [deviceModel, setDeviceModel] = useState("");

  const handleVerification = (model: string) => {
    setDeviceModel(model);
    setShowChat(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Verificar Compatibilidad</DialogTitle>
          <DialogDescription>
            Consulta si tu dispositivo es compatible con eSIM
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          {!showChat ? (
            <DeviceVerification 
              onVerify={handleVerification}
              compatibleDevices={compatibleDevices}
            />
          ) : (
            <DeviceChat 
              deviceModel={deviceModel}
              onReset={() => setShowChat(false)}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}