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
      { name: "billingAddress", type: "jsonb", description: "Dirección de facturación", supabaseField: "billing_address" },
      { name: "preferredLanguage", type: "string", description: "Idioma preferido", supabaseField: "preferred_language" },
      { name: "marketingPreferences", type: "jsonb", description: "Preferencias de marketing", supabaseField: "marketing_preferences" },
      { name: "stripeCustomerId", type: "string", description: "ID de Stripe", supabaseField: "stripe_customer_id" },
      { name: "paypalCustomerId", type: "string", description: "ID de PayPal", supabaseField: "paypal_customer_id" },
      { name: "metadata", type: "jsonb", description: "Metadatos adicionales", supabaseField: "metadata" }
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
      { name: "paymentMethod", type: "enum", description: "Método de pago", supabaseField: "payment_method" },
      { name: "paymentStatus", type: "enum", description: "Estado del pago", supabaseField: "payment_status" },
      { name: "shippingAddress", type: "jsonb", description: "Dirección de envío", supabaseField: "shipping_address" },
      { name: "trackingNumber", type: "string", description: "Número de seguimiento", supabaseField: "tracking_number" },
      { name: "carrier", type: "string", description: "Empresa de envío", supabaseField: "carrier" },
      { name: "notes", type: "jsonb[]", description: "Notas del pedido", supabaseField: "notes" },
      { name: "events", type: "jsonb[]", description: "Eventos del pedido", supabaseField: "events" }
    ]
  },
  {
    name: "Product",
    status: "verified",
    description: "Productos (SIMs físicas y eSIMs)",
    fields: [
      { name: "id", type: "uuid", description: "Identificador único", supabaseField: "id" },
      { name: "type", type: "OrderType", description: "Tipo de producto", supabaseField: "type" },
      { name: "title", type: "string", description: "Título del producto", supabaseField: "title" },
      { name: "description", type: "string", description: "Descripción", supabaseField: "description" },
      { name: "price", type: "integer", description: "Precio en centavos", supabaseField: "price" },
      { name: "features", type: "string[]", description: "Características", supabaseField: "features" },
      { name: "europeGB", type: "integer", description: "GB en Europa", supabaseField: "europe_gb" },
      { name: "spainGB", type: "integer", description: "GB en España", supabaseField: "spain_gb" },
      { name: "stock", type: "integer", description: "Stock disponible", supabaseField: "stock" }
    ]
  },
  {
    name: "Payment",
    status: "verified",
    description: "Pagos y transacciones financieras",
    fields: [
      { name: "id", type: "uuid", description: "Identificador único", supabaseField: "id" },
      { name: "orderId", type: "uuid", description: "ID del pedido", supabaseField: "order_id" },
      { name: "amount", type: "integer", description: "Monto en centavos", supabaseField: "amount" },
      { name: "currency", type: "string", description: "Moneda", supabaseField: "currency" },
      { name: "status", type: "PaymentStatus", description: "Estado del pago", supabaseField: "status" },
      { name: "paymentMethodId", type: "uuid", description: "ID del método de pago", supabaseField: "payment_method_id" },
      { name: "providerPaymentId", type: "string", description: "ID en el proveedor", supabaseField: "provider_payment_id" },
      { name: "providerReceiptUrl", type: "string", description: "URL del recibo", supabaseField: "provider_receipt_url" }
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