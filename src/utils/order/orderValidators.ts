import { CreateOrderDTO, Order, ShippingAddress } from "@/types/order/orderTypes";

export const validateShippingAddress = (address: ShippingAddress | undefined): string[] => {
  const errors: string[] = [];
  
  if (!address) {
    return ["La dirección de envío es requerida para pedidos físicos"];
  }

  if (!address.street?.trim()) {
    errors.push("La dirección es requerida");
  }
  if (!address.city?.trim()) {
    errors.push("La ciudad es requerida");
  }
  if (!address.state?.trim()) {
    errors.push("La provincia es requerida");
  }
  if (!address.postal_code?.trim()) {
    errors.push("El código postal es requerido");
  }
  if (!address.country?.trim()) {
    errors.push("El país es requerido");
  }
  if (!address.phone?.trim()) {
    errors.push("El teléfono es requerido");
  }

  return errors;
};

export const validateCreateOrderData = (orderData: Partial<CreateOrderDTO>): string[] => {
  const errors: string[] = [];

  if (!orderData.customer_id) {
    errors.push("El ID del cliente es requerido");
  }
  if (!orderData.product_id) {
    errors.push("El ID del producto es requerido");
  }
  if (!orderData.type) {
    errors.push("El tipo de pedido es requerido");
  }
  if (orderData.total_amount === undefined || orderData.total_amount <= 0) {
    errors.push("El monto total debe ser mayor a 0");
  }
  if (orderData.quantity === undefined || orderData.quantity <= 0) {
    errors.push("La cantidad debe ser mayor a 0");
  }

  // Validaciones específicas por tipo de pedido
  if (orderData.type === 'physical' && !orderData.shipping_address) {
    errors.push(...validateShippingAddress(undefined));
  }
  if (orderData.type === 'esim' && !orderData.activation_date) {
    errors.push("La fecha de activación es requerida para eSIMs");
  }

  return errors;
};

export const validateOrderStatus = (order: Order, newStatus: Order['status']): string[] => {
  const errors: string[] = [];
  const validTransitions: Record<Order['status'], Order['status'][]> = {
    'payment_pending': ['payment_failed', 'processing', 'cancelled'],
    'payment_failed': ['payment_pending', 'cancelled'],
    'processing': ['shipped', 'cancelled'],
    'shipped': ['delivered', 'cancelled'],
    'delivered': [],
    'cancelled': []
  };

  if (!validTransitions[order.status].includes(newStatus)) {
    errors.push(`No se puede cambiar el estado de ${order.status} a ${newStatus}`);
  }

  // Validaciones específicas por tipo de pedido
  if (newStatus === 'shipped' && order.type === 'physical') {
    if (!order.tracking_number) {
      errors.push("Se requiere número de seguimiento para enviar el pedido");
    }
    if (!order.carrier) {
      errors.push("Se requiere transportista para enviar el pedido");
    }
  }

  return errors;
};

export const validateOrderNote = (content: string): string[] => {
  const errors: string[] = [];

  if (!content?.trim()) {
    errors.push("El contenido de la nota es requerido");
  }
  if (content?.length > 1000) {
    errors.push("La nota no puede exceder los 1000 caracteres");
  }

  return errors;
};