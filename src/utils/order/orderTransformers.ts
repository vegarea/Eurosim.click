import { Json } from "@/integrations/supabase/types"
import { CreateOrderDTO, Order } from "@/types"

export const transformShippingAddressToJson = (address: any): Json => {
  return {
    street: address.street,
    city: address.city,
    state: address.state,
    country: address.country,
    postal_code: address.postal_code,
    phone: address.phone
  } as Json;
};

export const transformJsonToShippingAddress = (json: Json | null) => {
  if (!json || typeof json !== 'object') return undefined;

  const address = json as Record<string, any>;
  
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

export const transformCustomerDocumentation = (dbCustomer: any) => {
  if (!dbCustomer) return undefined;

  return {
    passportNumber: dbCustomer.passport_number,
    birthDate: dbCustomer.birth_date,
    gender: dbCustomer.gender,
    activationDate: dbCustomer.activation_date
  };
};

export const prepareOrderForCreate = (orderData: Partial<CreateOrderDTO>): CreateOrderDTO => {
  return {
    customer_id: orderData.customer_id!,
    product_id: orderData.product_id!,
    type: orderData.type!,
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
      phone: dbOrder.customer.phone,
      documentation: transformCustomerDocumentation(dbOrder.customer)
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
    events: dbOrder.events || [],
    product: dbOrder.product ? {
      title: dbOrder.product.title,
      description: dbOrder.product.description,
      price: dbOrder.product.price
    } : undefined,
    metadata: dbOrder.metadata,
    created_at: dbOrder.created_at,
    updated_at: dbOrder.updated_at,
    title: dbOrder.product?.title,
    description: dbOrder.product?.description,
    total: dbOrder.total_amount
  };
};