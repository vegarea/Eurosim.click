import { Json } from "@/integrations/supabase/types";
import { ShippingAddress, CreateOrderDTO, Order } from "@/types/order/orderTypes";

export const transformShippingAddressToJson = (address: ShippingAddress): Json => {
  return {
    street: address.street,
    city: address.city,
    state: address.state,
    country: address.country,
    postal_code: address.postal_code,
    phone: address.phone
  } as Json;
};

export const transformJsonToShippingAddress = (json: Json | null): ShippingAddress | undefined => {
  if (!json) return undefined;

  const address = json as Record<string, string>;
  
  if (!address.street || !address.city || !address.state || 
      !address.country || !address.postal_code || !address.phone) {
    console.warn('Dirección incompleta:', address);
    return undefined;
  }

  return {
    street: address.street,
    city: address.city,
    state: address.state,
    country: address.country,
    postal_code: address.postal_code,
    phone: address.phone
  };
};

export const prepareOrderForCreate = (orderData: Partial<CreateOrderDTO>): CreateOrderDTO => {
  return {
    customer_id: orderData.customer_id!,
    product_id: orderData.product_id!,
    type: orderData.type!,
    status: 'payment_pending',
    payment_status: 'pending',
    total_amount: orderData.total_amount!,
    quantity: orderData.quantity || 1,
    shipping_address: orderData.shipping_address,
    activation_date: orderData.activation_date,
    notes: [],
    metadata: {}
  };
};

export const transformDatabaseOrderToOrder = (dbOrder: any): Order => {
  return {
    id: dbOrder.id,
    customer_id: dbOrder.customer_id,
    product_id: dbOrder.product_id,
    customer: dbOrder.customer ? {
      name: dbOrder.customer.name,
      email: dbOrder.customer.email,
      phone: dbOrder.customer.phone
    } : undefined,
    status: dbOrder.status,
    type: dbOrder.type,
    total_amount: dbOrder.total_amount,
    quantity: dbOrder.quantity,
    payment_method: dbOrder.payment_method,
    payment_status: dbOrder.payment_status,
    shipping_address: transformJsonToShippingAddress(dbOrder.shipping_address),
    tracking_number: dbOrder.tracking_number,
    carrier: dbOrder.carrier,
    activation_date: dbOrder.activation_date,
    notes: dbOrder.notes || [],
    product: dbOrder.product ? {
      title: dbOrder.product.title,
      description: dbOrder.product.description,
      price: dbOrder.product.price
    } : undefined,
    created_at: dbOrder.created_at,
    updated_at: dbOrder.updated_at
  };
};