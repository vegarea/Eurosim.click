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

export type OrderType = 'physical' | 'esim';
export type PaymentMethod = 'stripe' | 'paypal';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type OrderStatus = 
  | 'payment_pending'
  | 'payment_failed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export type OrderEventType = 
  | 'created'
  | 'status_changed'
  | 'payment_processed'
  | 'automated_update'
  | 'note_added';

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

export interface OrderNote {
  id: string;
  text: string;
  userId: string;
  userName: string;
  createdAt: string;
}

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phone?: string;
  fullName: string;
  email: string;
}

export interface Customer {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  passportNumber?: string;
  birthDate?: Date;
  gender?: 'M' | 'F';
  defaultShippingAddress?: ShippingAddress;
  preferredLanguage?: string;
}

export interface DocumentValidationForm {
  fullName: string;
  birthDate: Date;
  gender: 'M' | 'F';
  passportNumber: string;
  activationDate: Date;
  email?: string;
  phone?: string;
}

export interface ShippingAddressForm {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

// Alias para mantener compatibilidad
export type DocumentValidation = DocumentValidationForm;