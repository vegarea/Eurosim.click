import { FileJson, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { TypeDefinition } from "../types/WorkflowTypes"
import { TypeCard } from "./TypeCard"

const enumTypes: TypeDefinition[] = [
  {
    name: "OrderStatus",
    status: "verified",
    description: "Estados posibles de un pedido",
    fields: [
      { name: "PAYMENT_PENDING", type: "enum", description: "Pendiente de pago" },
      { name: "PAYMENT_FAILED", type: "enum", description: "Pago fallido" },
      { name: "PROCESSING", type: "enum", description: "En procesamiento" },
      { name: "SHIPPED", type: "enum", description: "Enviado" },
      { name: "DELIVERED", type: "enum", description: "Entregado" },
      { name: "CANCELLED", type: "enum", description: "Cancelado" }
    ]
  },
  {
    name: "OrderType",
    status: "verified",
    description: "Tipos de pedido disponibles",
    fields: [
      { name: "PHYSICAL", type: "enum", description: "SIM física" },
      { name: "ESIM", type: "enum", description: "eSIM" }
    ]
  },
  {
    name: "PaymentStatus",
    status: "verified",
    description: "Estados de pago",
    fields: [
      { name: "PENDING", type: "enum", description: "Pendiente" },
      { name: "COMPLETED", type: "enum", description: "Completado" },
      { name: "FAILED", type: "enum", description: "Fallido" },
      { name: "REFUNDED", type: "enum", description: "Reembolsado" }
    ]
  },
  {
    name: "PaymentMethod",
    status: "verified",
    description: "Métodos de pago soportados",
    fields: [
      { name: "STRIPE", type: "enum", description: "Stripe" },
      { name: "PAYPAL", type: "enum", description: "PayPal" }
    ]
  },
  {
    name: "ProductStatus",
    status: "verified",
    description: "Estados posibles de un producto",
    fields: [
      { name: "ACTIVE", type: "enum", description: "Activo" },
      { name: "INACTIVE", type: "enum", description: "Inactivo" }
    ]
  },
  {
    name: "Gender",
    status: "verified",
    description: "Géneros soportados",
    fields: [
      { name: "M", type: "enum", description: "Masculino" },
      { name: "F", type: "enum", description: "Femenino" }
    ]
  }
];

export function EnumTypes() {
  return (
    <div className="space-y-4">
      {enumTypes.map((type) => (
        <TypeCard key={type.name} type={type} />
      ))}
    </div>
  );
}