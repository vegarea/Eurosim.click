import { Json } from "@/integrations/supabase/types";
import { ShippingAddress } from "@/types";

export const transformShippingAddress = (address: Json | null): ShippingAddress | null => {
  if (!address) return null;
  
  // Asegurarnos de que el objeto tiene la estructura correcta
  const addressObj = address as Record<string, string>;
  
  if (!addressObj.street || !addressObj.city || !addressObj.state || 
      !addressObj.country || !addressObj.postal_code || !addressObj.phone) {
    console.warn('Dirección incompleta:', addressObj);
    return null;
  }

  return {
    street: addressObj.street,
    city: addressObj.city,
    state: addressObj.state,
    country: addressObj.country,
    postal_code: addressObj.postal_code,
    phone: addressObj.phone
  };
};

export const prepareShippingAddress = (address: ShippingAddress): Record<string, string> => {
  return {
    street: address.street,
    city: address.city,
    state: address.state,
    country: address.country,
    postal_code: address.postal_code,
    phone: address.phone
  };
};