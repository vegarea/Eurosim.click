import { FileJson, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { TypeDefinition } from "../types/WorkflowTypes"
import { TypeCard } from "./TypeCard"

const databaseTypes: TypeDefinition[] = [
  {
    name: "Customer",
    status: "verified",
    description: "Información de clientes registrados",
    fields: [
      { name: "id", type: "uuid", description: "Identificador único", supabaseField: "id" },
      { name: "name", type: "string", description: "Nombre completo", supabaseField: "name" },
      { name: "email", type: "string", description: "Correo electrónico", supabaseField: "email" },
      { name: "phone", type: "string", description: "Número de teléfono", supabaseField: "phone" },
      { name: "passportNumber", type: "string", description: "Número de pasaporte UE", supabaseField: "passport_number" },
      { name: "birthDate", type: "date", description: "Fecha de nacimiento", supabaseField: "birth_date" },
      { name: "gender", type: "enum", description: "Género (M/F)", supabaseField: "gender" },
      { name: "defaultShippingAddress", type: "jsonb", description: "Dirección de envío predeterminada", supabaseField: "default_shipping_address" },
      { name: "billingAddress", type: "jsonb", description: "Dirección de facturación", supabaseField: "billing_address" }
    ]
  },
  {
    name: "Order",
    status: "verified",
    description: "Pedidos y transacciones",
    fields: [
      { name: "id", type: "uuid", description: "Identificador único", supabaseField: "id" },
      { name: "customerId", type: "uuid", description: "ID del cliente", supabaseField: "customer_id" },
      { name: "status", type: "OrderStatus", description: "Estado del pedido", supabaseField: "status" },
      { name: "type", type: "OrderType", description: "Tipo de pedido (physical/esim)", supabaseField: "type" },
      { name: "totalAmount", type: "integer", description: "Monto total en centavos", supabaseField: "total_amount" },
      { name: "paymentMethod", type: "enum", description: "Método de pago (stripe/paypal)", supabaseField: "payment_method" },
      { name: "paymentStatus", type: "enum", description: "Estado del pago", supabaseField: "payment_status" },
      { name: "shippingAddress", type: "jsonb", description: "Dirección de envío", supabaseField: "shipping_address" },
      { name: "trackingNumber", type: "string", description: "Número de seguimiento", supabaseField: "tracking_number" },
      { name: "carrier", type: "string", description: "Empresa de envío", supabaseField: "carrier" }
    ]
  },
  {
    name: "EmailTemplate",
    status: "verified",
    description: "Plantillas de correo electrónico",
    fields: [
      { name: "id", type: "uuid", description: "Identificador único", supabaseField: "id" },
      { name: "name", type: "string", description: "Nombre de la plantilla", supabaseField: "name" },
      { name: "subject", type: "string", description: "Asunto del correo", supabaseField: "subject" },
      { name: "content", type: "string", description: "Contenido HTML", supabaseField: "content" },
      { name: "type", type: "enum", description: "Tipo de producto", supabaseField: "type" },
      { name: "status", type: "enum", description: "Estado del pedido", supabaseField: "status" },
      { name: "variables", type: "jsonb", description: "Variables disponibles", supabaseField: "variables" }
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