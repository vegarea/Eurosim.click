import React, { createContext, useContext } from 'react';
import { Order } from '@/types';
import { useOrdersData } from '@/hooks/useOrdersData';

interface OrdersContextType {
  orders: Order[];
  updateOrder: (orderId: string, updates: Partial<Order>) => void;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const { orders, updateOrderStatus } = useOrdersData();

  const updateOrder = (orderId: string, updates: Partial<Order>) => {
    if (updates.status) {
      updateOrderStatus.mutate({ orderId, newStatus: updates.status });
    }
  };

  return (
    <OrdersContext.Provider value={{ orders, updateOrder }}>
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