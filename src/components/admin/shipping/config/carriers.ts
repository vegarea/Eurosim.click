interface CarrierConfig {
  id: string
  name: string
  trackingUrl: string
  emailTemplate: string
}

export const SHIPPING_CARRIERS: CarrierConfig[] = [
  {
    id: "dhl",
    name: "DHL",
    trackingUrl: "https://www.dhl.com/mx-es/home/tracking.html?tracking-id={{tracking}}",
    emailTemplate: "Puedes dar seguimiento a tu envío DHL con el número {{tracking}} en el siguiente enlace: https://www.dhl.com/mx-es/home/tracking.html?tracking-id={{tracking}}"
  },
  {
    id: "fedex",
    name: "FedEx",
    trackingUrl: "https://www.fedex.com/es-mx/tracking.html?tracknumbers={{tracking}}",
    emailTemplate: "Puedes dar seguimiento a tu envío FedEx con el número {{tracking}} en el siguiente enlace: https://www.fedex.com/es-mx/tracking.html?tracknumbers={{tracking}}"
  },
  {
    id: "ups",
    name: "UPS",
    trackingUrl: "https://www.ups.com/track?tracknum={{tracking}}&loc=es_MX",
    emailTemplate: "Puedes dar seguimiento a tu envío UPS con el número {{tracking}} en el siguiente enlace: https://www.ups.com/track?tracknum={{tracking}}&loc=es_MX"
  }
]

export const getCarrierConfig = (carrierId: string): CarrierConfig | undefined => {
  return SHIPPING_CARRIERS.find(carrier => carrier.id === carrierId)
}

export const getTrackingMessage = (carrierId: string, trackingNumber: string): string => {
  const carrier = getCarrierConfig(carrierId)
  if (!carrier) return ""
  
  return carrier.emailTemplate.replace(/{{tracking}}/g, trackingNumber)
}

export const getTrackingUrl = (carrierId: string, trackingNumber: string): string => {
  const carrier = getCarrierConfig(carrierId)
  if (!carrier) return ""
  
  return carrier.trackingUrl.replace(/{{tracking}}/g, trackingNumber)
}