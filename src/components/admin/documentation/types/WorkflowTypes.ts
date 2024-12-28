export * from './orders/OrderTypes';
export type { OrderNote } from './checkout/CheckoutTypes';

// Re-export common types that might be needed across the application
export type { 
  WorkflowStatus,
  WorkflowItem,
  WorkflowCategory,
  TypeField,
  TypeDefinition,
  DocumentValidationForm,
  ShippingAddressForm,
  ShippingAddress,
  Customer
} from './workflow/WorkflowTypes';