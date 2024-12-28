import React, { createContext, useContext, useState, useEffect } from "react"
import type { Order, OrderStatus } from "@/types/database"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

interface OrdersContextType {
  orders: Order[]
  updateOrder: (orderId: string, updates: Partial<Order>) => Promise<void>
  isLoading: boolean
  error: Error | null
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined)

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          customers (
            name,
            email,
            phone
          ),
          products (
            title,
            description
          )
        `)
        .order('created_at', { ascending: false })

      if (error) throw error

      const formattedOrders: Order[] = data.map(order => ({
        id: order.id,
        date: order.created_at,
        customer: order.customers?.name || 'Cliente no encontrado',
        email: order.customers?.email,
        phone: order.customers?.phone,
        total: order.total_amount / 100,
        status: order.status as OrderStatus,
        type: order.type as "physical" | "esim",
        paymentMethod: order.payment_method,
        title: order.products?.title,
        description: order.products?.description,
        quantity: order.quantity,
        shippingAddress: order.shipping_address ? {
          street: (order.shipping_address as any).street,
          city: (order.shipping_address as any).city,
          state: (order.shipping_address as any).state,
          zipCode: (order.shipping_address as any).postal_code
        } : undefined
      }))

      setOrders(formattedOrders)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching orders:', error)
      setError(error as Error)
      setIsLoading(false)
      toast.error('Error al cargar los pedidos')
    }
  }

  const updateOrder = async (orderId: string, updates: Partial<Order>) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({
          status: updates.status,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId)

      if (error) throw error

      setOrders(orders.map(order => 
        order.id === orderId 
          ? { ...order, ...updates }
          : order
      ))

      toast.success('Pedido actualizado correctamente')
    } catch (error) {
      console.error('Error updating order:', error)
      toast.error('Error al actualizar el pedido')
    }
  }

  return (
    <OrdersContext.Provider value={{ orders, updateOrder, isLoading, error }}>
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