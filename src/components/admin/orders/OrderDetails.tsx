import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { OrderStatusBadge } from "./OrderStatusBadge"
import { Badge } from "@/components/ui/badge"
import { Order, OrderStatus } from "./types"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { statusConfig } from "./OrderStatusBadge"
import { toast } from "sonner"
import { OrderStatusConfirmDialog } from "./OrderStatusConfirmDialog"

interface OrderDetailsProps {
  order: Order | null
  onClose: () => void
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void
}

export function OrderDetails({ order, onClose, onStatusChange }: OrderDetailsProps) {
  const [status, setStatus] = useState<OrderStatus | null>(order?.status || null)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [pendingStatus, setPendingStatus] = useState<OrderStatus | null>(null)

  if (!order) return null

  const handleStatusChange = (newStatus: OrderStatus) => {
    setPendingStatus(newStatus)
    setShowConfirmDialog(true)
  }

  const confirmStatusChange = () => {
    if (pendingStatus) {
      setStatus(pendingStatus)
      onStatusChange(order.id, pendingStatus)
      toast.success("Estado actualizado correctamente")
      setShowConfirmDialog(false)
    }
  }

  const canChangeToShipped = order.type === "physical" && status === "processing"
  const canChangeToDelivered = 
    (status === "processing" && order.type === "esim") || 
    (status === "shipped" && order.type === "physical")

  return (
    <>
      <Dialog open={!!order} onOpenChange={() => onClose()}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalles del Pedido {order.id}</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Información básica */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-1">Cliente</h3>
                <p>{order.customer}</p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Fecha</h3>
                <p>{new Date(order.date).toLocaleDateString()}</p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Total</h3>
                <p>${order.total.toFixed(2)}</p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Tipo</h3>
                <Badge variant="secondary" className="bg-gray-100">
                  {order.type === "physical" ? "SIM Física" : "E-SIM"}
                </Badge>
              </div>
              <div>
                <h3 className="font-medium mb-1">Método de Pago</h3>
                <p className="capitalize">{order.paymentMethod || "No especificado"}</p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Estado</h3>
                <OrderStatusBadge status={status || order.status} />
              </div>
            </div>

            {/* Control de estado */}
            <div className="border-t pt-4">
              <h3 className="font-medium mb-3">Actualizar Estado</h3>
              <div className="flex gap-4">
                <Select
                  value={status || order.status}
                  onValueChange={(value: OrderStatus) => handleStatusChange(value)}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(statusConfig).map(([key, { label }]) => {
                      const statusKey = key as OrderStatus
                      let isDisabled = false

                      if (statusKey === "shipped" && !canChangeToShipped) {
                        isDisabled = true
                      }
                      if (statusKey === "delivered" && !canChangeToDelivered) {
                        isDisabled = true
                      }

                      return (
                        <SelectItem 
                          key={key} 
                          value={key}
                          disabled={isDisabled}
                        >
                          {label}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>

                <Button variant="outline" onClick={onClose}>
                  Cerrar
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <OrderStatusConfirmDialog
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        pendingStatus={pendingStatus}
        onConfirm={confirmStatusChange}
        orderType={order.type}
      />
    </>
  )
}