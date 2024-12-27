interface CarrierConfig {
  id: string
  name: string
  trackingUrl: string
  emailTemplate: string
}

export const SHIPPING_CARRIERS: CarrierConfig[] = [
  {
    id: "redpack",
    name: "Redpack",
    trackingUrl: "https://www.redpack.com.mx/rastreo?guia={{tracking}}",
    emailTemplate: "Puedes dar seguimiento a tu envío Redpack con el número de guía {{tracking}} en el siguiente enlace: https://www.redpack.com.mx/rastreo?guia={{tracking}}"
  },
  {
    id: "estafeta",
    name: "Estafeta",
    trackingUrl: "https://www.estafeta.com/Rastreo/{{tracking}}",
    emailTemplate: "Puedes dar seguimiento a tu envío Estafeta con el número de guía {{tracking}} en el siguiente enlace: https://www.estafeta.com/Rastreo/{{tracking}}"
  },
  {
    id: "fedex",
    name: "FedEx",
    trackingUrl: "https://www.fedex.com/es-mx/tracking.html?tracknumbers={{tracking}}",
    emailTemplate: "Puedes dar seguimiento a tu envío FedEx con el número de guía {{tracking}} en el siguiente enlace: https://www.fedex.com/es-mx/tracking.html?tracknumbers={{tracking}}"
  },
  {
    id: "dhl",
    name: "DHL",
    trackingUrl: "https://www.dhl.com/mx-es/home/rastreo.html?tracking-id={{tracking}}",
    emailTemplate: "Puedes dar seguimiento a tu envío DHL con el número de guía {{tracking}} en el siguiente enlace: https://www.dhl.com/mx-es/home/rastreo.html?tracking-id={{tracking}}"
  },
  {
    id: "ups",
    name: "UPS",
    trackingUrl: "https://www.ups.com/track?loc=es_MX&tracknum={{tracking}}",
    emailTemplate: "Puedes dar seguimiento a tu envío UPS con el número de guía {{tracking}} en el siguiente enlace: https://www.ups.com/track?loc=es_MX&tracknum={{tracking}}"
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