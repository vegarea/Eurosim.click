import { Database, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { TypeDefinition } from "../types/WorkflowTypes"
import { TypeCard } from "./TypeCard"

const databaseTypes: TypeDefinition[] = [
  {
    name: "Customer",
    status: "pending",
    description: "Información de clientes registrados",
    fields: [
      { name: "id", type: "uuid", description: "Identificador único", supabaseField: "id" },
      { name: "name", type: "string", description: "Nombre completo", supabaseField: "name" },
      { name: "email", type: "string", description: "Correo electrónico", supabaseField: "email" },
      { name: "phone", type: "string", description: "Número de teléfono", supabaseField: "phone" },
      { name: "passportNumber", type: "string", description: "Número de pasaporte UE", supabaseField: "passport_number" }
    ]
  },
  {
    name: "Order",
    status: "pending",
    description: "Pedidos y transacciones",
    fields: [
      { name: "id", type: "uuid", description: "Identificador único", supabaseField: "id" },
      { name: "customerId", type: "uuid", description: "ID del cliente", supabaseField: "customer_id" },
      { name: "status", type: "OrderStatus", description: "Estado del pedido", supabaseField: "status" },
      { name: "type", type: "OrderType", description: "Tipo de pedido (physical/esim)", supabaseField: "type" }
    ]
  },
  {
    name: "Product",
    status: "pending",
    description: "Productos (SIMs físicas y eSIMs)",
    fields: [
      { name: "id", type: "uuid", description: "Identificador único", supabaseField: "id" },
      { name: "type", type: "ProductType", description: "Tipo de producto", supabaseField: "type" },
      { name: "title", type: "string", description: "Nombre del producto", supabaseField: "title" },
      { name: "price", type: "number", description: "Precio en centavos", supabaseField: "price" }
    ]
  }
];

export function DatabaseTypes() {
  return (
    <div className="space-y-4">
      {databaseTypes.map((type) => (
        <TypeCard key={type.name} type={type} />
      ))}
    </div>
  );
}