import React, { createContext, useContext, useState } from 'react';
import { OrderUI } from '@/types/order.types';
import { mockOrders } from '@/components/admin/orders/mockData';

interface OrdersContextType {
  orders: OrderUI[];
  updateOrder: (orderId: string, updates: Partial<OrderUI>) => void;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<OrderUI[]>(mockOrders);

  const updateOrder = (orderId: string, updates: Partial<OrderUI>) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, ...updates } : order
      )
    );
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