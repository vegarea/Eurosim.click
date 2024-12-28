import { FileJson, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { TypeDefinition } from "../types/WorkflowTypes"
import { TypeCard } from "./TypeCard"

const interfaceTypes: TypeDefinition[] = [
  {
    name: "ShippingAddress",
    status: "verified",
    description: "Estructura de dirección de envío",
    fields: [
      { name: "street", type: "string", description: "Calle y número" },
      { name: "city", type: "string", description: "Ciudad" },
      { name: "state", type: "string", description: "Estado" },
      { name: "country", type: "string", description: "País" },
      { name: "postalCode", type: "string", description: "Código postal" },
      { name: "phone", type: "string", description: "Teléfono de contacto" }
    ]
  },
  {
    name: "OrderEvent",
    status: "verified",
    description: "Eventos relacionados con pedidos",
    fields: [
      { name: "id", type: "string", description: "ID del evento" },
      { name: "type", type: "OrderEventType", description: "Tipo de evento" },
      { name: "description", type: "string", description: "Descripción del evento" },
      { name: "userId", type: "string", description: "ID del usuario que generó el evento" },
      { name: "metadata", type: "object", description: "Datos adicionales del evento" },
      { name: "createdAt", type: "string", description: "Fecha de creación" }
    ]
  },
  {
    name: "ShippingConfirmation",
    status: "verified",
    description: "Datos de confirmación de envío",
    fields: [
      { name: "trackingNumber", type: "string", description: "Número de seguimiento" },
      { name: "carrier", type: "ShippingCarrier", description: "Empresa de envío" },
      { name: "estimatedDelivery", type: "string", description: "Fecha estimada de entrega" },
      { name: "trackingUrl", type: "string", description: "URL de seguimiento" }
    ]
  }
];

export function InterfaceTypes() {
  return (
    <div className="space-y-4">
      {interfaceTypes.map((type) => (
        <TypeCard key={type.name} type={type} />
      ))}
    </div>
  );
}