import React, { createContext, useContext } from 'react';
import { Order, OrderStatus, OrderNote } from '@/types/order/orderTypes';
import { useOrdersData } from '@/hooks/useOrdersData';
import { toast } from 'sonner';

interface OrdersContextType {
  orders: Order[];
  updateOrder: (orderId: string, updates: Partial<Order>) => void;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const { orders = [], updateOrderStatus, addOrderNote } = useOrdersData();

  const updateOrder = async (orderId: string, updates: Partial<Order>) => {
    try {
      // Si hay un cambio de estado, usar la mutación específica
      if (updates.status) {
        await updateOrderStatus.mutateAsync({ 
          orderId, 
          newStatus: updates.status 
        });
      }

      // Si hay una nueva nota, usar la mutación específica
      if (updates.notes) {
        const newNote = updates.notes[0];
        if (newNote) {
          await addOrderNote.mutateAsync({
            orderId,
            content: newNote.content,
            isInternal: newNote.is_internal
          });
        }
      }

      toast.success('Pedido actualizado correctamente');
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error('Error al actualizar el pedido');
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