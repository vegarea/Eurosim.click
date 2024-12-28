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
      { name: "PENDING", type: "enum", description: "Pendiente de pago" },
      { name: "PROCESSING", type: "enum", description: "En procesamiento" },
      { name: "SHIPPED", type: "enum", description: "Enviado" },
      { name: "DELIVERED", type: "enum", description: "Entregado" }
    ]
  },
  {
    name: "ProductType",
    status: "verified",
    description: "Tipos de producto disponibles",
    fields: [
      { name: "PHYSICAL", type: "enum", description: "SIM física" },
      { name: "ESIM", type: "enum", description: "eSIM" }
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