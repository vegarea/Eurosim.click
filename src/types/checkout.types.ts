import { ShippingAddress } from './database.types';

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

export interface CreateOrderData {
  customer: {
    name: string;
    email: string;
    phone?: string;
    passport_number?: string;
    birth_date?: string;
    gender?: string;
    shipping_address?: ShippingAddress;
  };
  order: {
    product_id: string;
    type: 'physical' | 'esim';
    quantity: number;
    total_amount: number;
    shipping_address?: ShippingAddress;
    activation_date?: string;
  };
}