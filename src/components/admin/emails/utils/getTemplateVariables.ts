import { Order } from "@/types/database/orders"
import { Customer } from "@/types/database/customers"
import { EmailTemplate, OrderMetadata } from "../types"

export const getTemplateVariables = async (
  template: EmailTemplate,
  order: Order,
  customer: Customer
) => {
  const baseVariables = {
    nombre_cliente: customer.name,
    numero_pedido: order.id,
    total: (order.total_amount / 100).toFixed(2),
    moneda: "EUR",
    fecha_pedido: new Date(order.created_at).toLocaleDateString()
  }

  // Variables específicas para SIM física
  const physicalVariables = order.type === 'physical' ? {
    numero_tracking: order.tracking_number || '',
    empresa_envio: order.carrier || '',
    url_tracking: order.carrier ? `https://track.${order.carrier}.com/${order.tracking_number}` : '',
    direccion_envio: order.shipping_address ? JSON.stringify(order.shipping_address) : '',
    fecha_estimada: order.activation_date ? new Date(order.activation_date).toLocaleDateString() : ''
  } : {}

  // Variables específicas para E-SIM
  const metadata = order.metadata as OrderMetadata
  const esimVariables = order.type === 'esim' ? {
    codigo_activacion: metadata?.activation_code || '',
    qr_code: metadata?.qr_code || '',
    fecha_activacion: order.activation_date ? new Date(order.activation_date).toLocaleDateString() : '',
    instrucciones_activacion: metadata?.activation_instructions || ''
  } : {}

  return {
    ...baseVariables,
    ...physicalVariables,
    ...esimVariables
  }
}