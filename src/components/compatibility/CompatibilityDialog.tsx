import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DeviceVerification } from "./DeviceVerification";
import { DeviceChat } from "./DeviceChat";

interface CompatibilityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CompatibilityDialog({ open, onOpenChange }: CompatibilityDialogProps) {
  const [showChat, setShowChat] = useState(false);
  const [deviceModel, setDeviceModel] = useState("");

  const handleVerification = (model: string) => {
    setDeviceModel(model);
    setShowChat(true);
  };

  const handleReset = () => {
    setShowChat(false);
    setDeviceModel("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {showChat ? "Chat de Compatibilidad" : "Verificar Compatibilidad"}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          {!showChat ? (
            <DeviceVerification onVerify={handleVerification} />
          ) : (
            <DeviceChat deviceModel={deviceModel} onReset={handleReset} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}