import { Order as DatabaseOrder } from "@/types/database/orders"
import { OrderEvent } from "@/types/database/common"
import { OrderStatus } from "@/types/database/enums"

// Extender el tipo Order de la base de datos para incluir campos adicionales de UI
export interface Order extends DatabaseOrder {
  customer_name?: string
  customer_email?: string
  customer_phone?: string
  events?: OrderEvent[]
}

export type { OrderEvent, OrderStatus }