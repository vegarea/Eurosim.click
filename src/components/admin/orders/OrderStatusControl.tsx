import { OrderStatus } from "./types"
import { statusConfig } from "./OrderStatusBadge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { RefreshCw } from "lucide-react"

interface OrderStatusControlProps {
  currentStatus: OrderStatus
  orderType: "physical" | "esim"
  onStatusChange: (newStatus: OrderStatus) => void
}

export function OrderStatusControl({ 
  currentStatus, 
  orderType,
  onStatusChange 
}: OrderStatusControlProps) {
  const canChangeToShipped = orderType === "physical" && currentStatus === "processing"
  const canChangeToDelivered = 
    (currentStatus === "processing" && orderType === "esim") || 
    (currentStatus === "shipped" && orderType === "physical")

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RefreshCw className="h-5 w-5 text-gray-500" />
          Control de Estado
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <Select
            value={currentStatus}
            onValueChange={(value: OrderStatus) => onStatusChange(value)}
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
        </div>
      </CardContent>
    </Card>
  )
}