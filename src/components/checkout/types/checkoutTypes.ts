import { 
  ShippingAddress,
  ShippingAddressForm,
  DocumentValidation,
  DocumentValidationForm,
  Customer
} from "@/components/admin/documentation/types/WorkflowTypes"

export interface CheckoutFormData extends Partial<Customer> {
  shippingAddress?: ShippingAddress;
  documentValidation?: DocumentValidation;
}

export interface DocumentationFormProps {
  onSubmit: (values: DocumentValidationForm) => void;
  onValidityChange?: (isValid: boolean) => void;
  initialData?: Partial<DocumentValidationForm>;
}

export interface ShippingFormProps {
  onSubmit: (values: ShippingAddressForm) => void;
  onValidityChange?: (isValid: boolean) => void;
  initialData?: Partial<ShippingAddressForm>;
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