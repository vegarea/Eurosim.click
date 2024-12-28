import { 
  ShippingAddress, 
  OrderType, 
  DocumentValidation,
  Customer,
  Order,
  Payment
} from "@/components/admin/documentation/types/WorkflowTypes"

export interface CheckoutFormData extends Partial<Customer & DocumentValidation> {
  shippingAddress?: ShippingAddress;
}

export interface CheckoutContextData {
  formData: CheckoutFormData;
  step: number;
  isFormValid: boolean;
  orderType: OrderType;
}

export interface DocumentationFormProps {
  onSubmit: (values: Partial<DocumentValidation>) => void;
  onValidityChange?: (isValid: boolean) => void;
  initialData?: Partial<DocumentValidation>;
}

export interface ShippingFormProps {
  onSubmit: (values: ShippingAddress) => void;
  onValidityChange?: (isValid: boolean) => void;
  initialData?: Partial<ShippingAddress>;
}

export interface ESimFormProps {
  onSubmit: (values: Partial<Customer>) => void;
  onValidityChange?: (isValid: boolean) => void;
  initialData?: Partial<Customer>;
}

export interface ReviewStepProps {
  formData: CheckoutFormData;
  onUpdateField: (field: string, value: any) => void;
}