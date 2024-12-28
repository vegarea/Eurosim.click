export interface ShippingFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface DocumentationFormData {
  fullName: string;
  birthDate: Date;
  gender: string;
  passportNumber: string;
  activationDate: Date;
}

export type CheckoutFormData = ShippingFormData & DocumentationFormData;