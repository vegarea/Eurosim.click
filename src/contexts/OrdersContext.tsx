import { createContext, useContext, ReactNode } from 'react';
import { Order, OrderStatus } from '@/components/admin/orders/types';
import { useOrdersData } from '@/hooks/useOrdersData';

interface OrdersContextType {
  orders: Order[];
  isLoading: boolean;
  error: Error | null;
  updateOrder: (orderId: string, updates: Partial<Order>) => void;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export function OrdersProvider({ children }: { children: ReactNode }) {
  const { 
    orders = [], 
    isLoading, 
    error, 
    updateOrderStatus 
  } = useOrdersData();

  const updateOrder = async (orderId: string, updates: Partial<Order>) => {
    if (updates.status) {
      await updateOrderStatus.mutateAsync({
        orderId,
        newStatus: updates.status as OrderStatus,
        reason: updates.metadata?.statusChangeReason
      });
    }
  };

  return (
    <OrdersContext.Provider value={{
      orders,
      isLoading,
      error: error as Error | null,
      updateOrder
    }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
}