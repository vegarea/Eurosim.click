export type WorkflowStatus = 'working' | 'pending' | 'reviewed';

export interface WorkflowItem {
  id: string;
  title: string;
  description: string;
  status: WorkflowStatus;
  details?: string;
  components?: string[];
  database?: string[];
  created_at?: string;
  updated_at?: string;
  metadata?: Record<string, any>;
}

export interface WorkflowCategory {
  id: string;
  title: string;
  items: WorkflowItem[];
  description?: string;
  icon?: string;
  metadata?: Record<string, any>;
}

export interface TypeField {
  name: string;
  type: string;
  description: string;
  supabaseField?: string;
}

export interface TypeDefinition {
  name: string;
  status: 'verified' | 'warning' | 'pending';
  description: string;
  fields: TypeField[];
}

// Tipos del sistema de pedidos
export type OrderStatus = 
  | "payment_pending"
  | "payment_failed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type OrderType = "physical" | "esim";

export type PaymentMethod = "stripe" | "paypal";

export type PaymentStatus = "pending" | "completed" | "failed" | "refunded";

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phone?: string;
}

export interface OrderNote {
  id: string;
  text: string;
  userId: string;
  userName: string;
  createdAt: string;
}

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

// Tipos del sistema de clientes
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  passportNumber?: string;
  birthDate?: string;
  gender?: 'M' | 'F';
  defaultShippingAddress?: ShippingAddress;
  billingAddress?: ShippingAddress;
  preferredLanguage?: string;
  marketingPreferences?: {
    emailMarketing: boolean;
    smsMarketing: boolean;
    pushNotifications: boolean;
    languagePreference: string;
    communicationFrequency: string;
  };
  stripeCustomerId?: string;
  paypalCustomerId?: string;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

// Tipos del sistema de productos
export interface Product {
  id: string;
  type: OrderType;
  title: string;
  description: string;
  price: number;
  features: string[];
  europeGB?: number;
  spainGB?: number;
  stock?: number;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

// Tipos del sistema de emails
export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  description: string;
  type: OrderType;
  status: OrderStatus;
  variables: Record<string, string>;
  carrierId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

// Tipos del sistema de pagos
export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paymentMethodId: string;
  providerPaymentId: string;
  providerReceiptUrl?: string;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

// Tipos del sistema de envíos
export type ShippingCarrier = "redpack" | "estafeta" | "fedex" | "dhl" | "ups";

export interface ShippingConfirmation {
  trackingNumber: string;
  carrier: ShippingCarrier;
  estimatedDelivery: string;
  trackingUrl: string;
}

// Tipos del sistema de documentación UE
export interface DocumentValidation {
  id: string;
  customerId: string;
  documentType: "passport" | "id_card";
  documentNumber: string;
  status: "pending" | "approved" | "rejected";
  validatedAt?: string;
  validatedBy?: string;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}