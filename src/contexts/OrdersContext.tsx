import { createContext, useContext } from 'react'
import { UIOrder, OrderStatus } from '@/types/supabase/base'
import { useOrders as useOrdersHook } from '@/hooks/useOrders'

interface OrdersContextType {
  orders: UIOrder[]
  updateOrder: (orderId: string, updates: Partial<UIOrder>) => Promise<void>
  isLoading: boolean
  error: Error | null
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined)

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const ordersHook = useOrdersHook()

  return (
    <OrdersContext.Provider value={ordersHook}>
      {children}
    </OrdersContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrdersContext)
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrdersProvider')
  }
  return context
}