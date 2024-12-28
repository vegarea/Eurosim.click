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

export type OrderType = "physical" | "esim";
export type PaymentMethod = "stripe" | "paypal";
export type PaymentStatus = "pending" | "completed" | "failed" | "refunded";

export interface OrderNote {
  id: string;
  text: string;
  userId: string;
  userName: string;
  createdAt: string;
}