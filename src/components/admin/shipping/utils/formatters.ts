import { Json } from "@/types/database/common"

interface ShippingAddress {
  street?: string
  city?: string
  state?: string
  country?: string
  postal_code?: string
}

export const formatShippingAddress = (address: Json | null): string => {
  if (!address) return 'No disponible'
  
  const shippingAddress = address as ShippingAddress
  return [
    shippingAddress.street,
    shippingAddress.city,
    shippingAddress.state,
    shippingAddress.country,
    shippingAddress.postal_code
  ].filter(Boolean).join(', ')
}