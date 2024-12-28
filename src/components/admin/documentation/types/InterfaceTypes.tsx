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
      { name: "userName", type: "string", description: "Nombre del usuario" },
      { name: "createdAt", type: "string", description: "Fecha de creación" },
      { name: "metadata", type: "object", description: "Datos adicionales del evento" }
    ]
  },
  {
    name: "OrderNote",
    status: "verified",
    description: "Notas en pedidos",
    fields: [
      { name: "id", type: "string", description: "ID de la nota" },
      { name: "text", type: "string", description: "Contenido de la nota" },
      { name: "userId", type: "string", description: "ID del usuario que creó la nota" },
      { name: "userName", type: "string", description: "Nombre del usuario" },
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
  },
  {
    name: "DocumentValidation",
    status: "verified",
    description: "Validación de documentos UE",
    fields: [
      { name: "id", type: "string", description: "ID de la validación" },
      { name: "customerId", type: "string", description: "ID del cliente" },
      { name: "documentType", type: "DocumentType", description: "Tipo de documento" },
      { name: "documentNumber", type: "string", description: "Número del documento" },
      { name: "status", type: "string", description: "Estado de la validación" },
      { name: "validatedAt", type: "string", description: "Fecha de validación" },
      { name: "validatedBy", type: "string", description: "Usuario que validó" }
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