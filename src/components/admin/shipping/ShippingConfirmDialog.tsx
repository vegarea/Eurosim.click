import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { SHIPPING_CARRIERS, getTrackingMessage } from "./config/carriers"

interface ShippingConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  orderId: string
  onConfirm: (trackingNumber: string, carrier: string) => void
}

export function ShippingConfirmDialog({
  open,
  onOpenChange,
  orderId,
  onConfirm,
}: ShippingConfirmDialogProps) {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [carrier, setCarrier] = useState("")
  const { toast } = useToast()

  const handleConfirm = () => {
    if (!trackingNumber || !carrier) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Por favor completa todos los campos",
      })
      return
    }

    onConfirm(trackingNumber, carrier)
    setTrackingNumber("")
    setCarrier("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar Envío</DialogTitle>
          <DialogDescription>
            Ingresa los detalles del envío para el pedido {orderId}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <label htmlFor="carrier">Compañía de Envío</label>
            <Select
              value={carrier}
              onValueChange={setCarrier}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona la compañía" />
              </SelectTrigger>
              <SelectContent>
                {SHIPPING_CARRIERS.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="tracking">Número de Tracking</label>
            <Input
              id="tracking"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Ingresa el número de tracking"
            />
          </div>

          {carrier && trackingNumber && (
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-2">Vista previa del mensaje:</p>
              <p className="text-sm text-muted-foreground">
                {getTrackingMessage(carrier, trackingNumber)}
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm}>
            Confirmar Envío
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}