import { createContext, useContext } from 'react'
import { UIOrder, OrderStatus } from '@/types/supabase/base'
import { useOrders } from '@/hooks/useOrders'

interface OrdersContextType {
  orders: UIOrder[]
  updateOrder: (orderId: string, updates: Partial<UIOrder>) => Promise<void>
  isLoading: boolean
  error: Error | null
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined)

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const ordersHook = useOrders()

  return (
    <OrdersContext.Provider value={ordersHook}>
      {children}
    </OrdersContext.Provider>
  )
}

export function useOrdersContext() {
  const context = useContext(OrdersContext)
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrdersProvider')
  }
  return context
}