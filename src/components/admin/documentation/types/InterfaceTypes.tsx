import { FileJson, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { TypeDefinition } from "../types/WorkflowTypes"
import { TypeCard } from "./TypeCard"

const interfaceTypes: TypeDefinition[] = [
  {
    name: "OrderDisplay",
    status: "warning",
    description: "Tipo para mostrar pedidos en la UI",
    fields: [
      { name: "id", type: "string", description: "ID del pedido" },
      { name: "formattedDate", type: "string", description: "Fecha formateada" },
      { name: "displayTotal", type: "string", description: "Total con formato" }
    ]
  },
  {
    name: "CustomerDisplay",
    status: "warning",
    description: "Tipo para mostrar clientes en la UI",
    fields: [
      { name: "id", type: "string", description: "ID del cliente" },
      { name: "fullName", type: "string", description: "Nombre completo" },
      { name: "formattedDate", type: "string", description: "Fecha de registro" }
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