export interface ShippingFormValues {
  name: string;
  email: string;
  phone: string;
  shipping_address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
    phone: string;
  } | null;
}