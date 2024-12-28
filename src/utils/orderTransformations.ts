import { Order, OrderWithDetails } from "@/types/supabase/orders";

export function transformOrderForDisplay(order: Order): OrderWithDetails {
  return {
    ...order,
    customer: order.customers?.name || 'Unknown',
    date: order.created_at || new Date().toISOString(),
    total: (order.total_amount || 0) / 100,
    paymentMethod: order.payment_method as any || 'stripe',
  };
}

export function transformOrderForApi(order: OrderWithDetails): Partial<Order> {
  return {
    status: order.status,
    payment_method: order.paymentMethod,
    total_amount: Math.round(order.total * 100),
    // ... otros campos que necesiten transformación
  };
}