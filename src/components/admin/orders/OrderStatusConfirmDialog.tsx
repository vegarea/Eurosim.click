import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { OrderStatus } from "./types"
import { statusConfig } from "./OrderStatusBadge"

interface OrderStatusConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  pendingStatus: OrderStatus | null
  onConfirm: () => void
  orderType: "physical" | "esim"
}

export function OrderStatusConfirmDialog({
  open,
  onOpenChange,
  pendingStatus,
  onConfirm,
  orderType,
}: OrderStatusConfirmDialogProps) {
  const getEmailTemplate = (newStatus: OrderStatus) => {
    const templates = {
      processing: "¡Tu pedido está en preparación! Pronto comenzaremos con el envío.",
      shipped: "¡Tu pedido está en camino! Puedes rastrear tu envío con el siguiente código:",
      delivered: orderType === "physical" 
        ? "¡Tu SIM física ha sido entregada! Esperamos que disfrutes tu servicio." 
        : "¡Tu eSIM está lista! Revisa tu email para las instrucciones de activación.",
      cancelled: "Tu pedido ha sido cancelado. Si tienes dudas, contáctanos.",
      payment_pending: "Tu pago está pendiente. Por favor, completa tu pago para procesar tu pedido.",
      payment_failed: "Hubo un problema con tu pago. Por favor, intenta nuevamente.",
    }
    return templates[newStatus] || "Estado de tu pedido actualizado."
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar cambio de estado</AlertDialogTitle>
          <AlertDialogDescription className="space-y-4">
            <p>
              ¿Estás seguro de que deseas cambiar el estado del pedido a{" "}
              <span className="font-medium">
                {pendingStatus && statusConfig[pendingStatus].label}
              </span>
              ?
            </p>
            
            <div className="bg-muted p-4 rounded-md space-y-2">
              <p className="font-medium">Se enviará el siguiente email al cliente:</p>
              <p className="text-sm text-muted-foreground">
                {pendingStatus && getEmailTemplate(pendingStatus)}
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            Confirmar cambio
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}