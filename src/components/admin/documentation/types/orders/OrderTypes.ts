import { PaymentMethod, PaymentStatus, ShippingAddress } from "../checkout/CheckoutTypes";

export type OrderStatus = 
  | "payment_pending"
  | "payment_failed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type OrderEventType = 
  | "created"
  | "status_changed"
  | "payment_processed"
  | "automated_update"
  | "note_added";

export interface OrderEvent {
  id: string;
  type: OrderEventType;
  description: string;
  userId?: string;
  userName?: string;
  createdAt: string;
  metadata?: {
    oldStatus?: OrderStatus;
    newStatus?: OrderStatus;
    paymentMethod?: string;
    automated?: boolean;
    trackingNumber?: string;
    carrier?: string;
  }
}

export interface OrderNote {
  id: string;
  text: string;
  userId: string;
  userName: string;
  createdAt: string;
}

export interface Order {
  id: string;
  date: string;
  customer: string;
  email?: string;
  phone?: string;
  total: number;
  status: OrderStatus;
  type: "physical" | "esim";
  paymentMethod?: PaymentMethod;
  notes?: OrderNote[];
  events?: OrderEvent[];
  
  // Detalles del producto
  title?: string;
  description?: string;
  quantity?: number;

  // Documentación UE
  passportNumber?: string;
  birthDate?: string;
  gender?: 'M' | 'F';
  activationDate?: string;

  // Información de envío (solo para SIM física)
  shippingAddress?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}