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
    paymentMethod?: PaymentMethod;
    automated?: boolean;
    trackingNumber?: string;
    carrier?: string;
  };
}

export interface Order {
  id: string;
  customerId: string;
  status: OrderStatus;
  type: "physical" | "esim";
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  shippingAddress?: ShippingAddress;
  trackingNumber?: string;
  carrier?: string;
  notes?: OrderNote[];
  events?: OrderEvent[];
  createdAt: string;
  updatedAt: string;
}