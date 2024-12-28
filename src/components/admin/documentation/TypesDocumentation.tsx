import { Code2, Check, AlertTriangle, ArrowRight } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface TypeDefinition {
  name: string;
  status: "verified" | "pending" | "warning";
  description: string;
  fields: Array<{
    name: string;
    type: string;
    description: string;
  }>;
}

const typeDefinitions: TypeDefinition[] = [
  {
    name: "Order",
    status: "pending",
    description: "Estructura de pedidos y transacciones",
    fields: [
      { name: "id", type: "string", description: "Identificador único UUID" },
      { name: "shipping_address", type: "Json", description: "Dirección de envío en formato JSON" },
      { name: "status", type: "OrderStatus", description: "Estado actual del pedido" },
      { name: "customer_id", type: "string", description: "ID del cliente (UUID)" },
    ]
  },
  {
    name: "Customer",
    status: "pending",
    description: "Información de clientes",
    fields: [
      { name: "id", type: "string", description: "Identificador único UUID" },
      { name: "full_name", type: "string", description: "Nombre completo" },
      { name: "email", type: "string", description: "Correo electrónico" },
    ]
  },
  {
    name: "Product",
    status: "pending",
    description: "Productos (SIMs físicas y eSIMs)",
    fields: [
      { name: "id", type: "string", description: "Identificador único UUID" },
      { name: "title", type: "string", description: "Nombre del producto" },
      { name: "type", type: "ProductType", description: "Tipo de producto (physical/esim)" },
    ]
  }
]

export function TypesDocumentation() {
  const getStatusIcon = (status: TypeDefinition["status"]) => {
    switch (status) {
      case "verified":
        return <Check className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Code2 className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusBadge = (status: TypeDefinition["status"]) => {
    switch (status) {
      case "verified":
        return (
          <Badge variant="default" className="bg-green-500">
            Verificado
          </Badge>
        );
      case "warning":
        return (
          <Badge variant="default" className="bg-yellow-500">
            Revisar
          </Badge>
        );
      default:
        return (
          <Badge variant="default" className="bg-blue-500">
            Pendiente
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 className="h-5 w-5 text-primary" />
            Definición de Tipos
          </CardTitle>
          <CardDescription>
            Estado de la sincronización entre tipos de TypeScript y la estructura de Supabase
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {typeDefinitions.map((typeDef) => (
              <Card key={typeDef.name} className="border-l-4 border-l-primary">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(typeDef.status)}
                      <CardTitle className="text-lg">{typeDef.name}</CardTitle>
                    </div>
                    {getStatusBadge(typeDef.status)}
                  </div>
                  <CardDescription>{typeDef.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                    <div className="space-y-4">
                      {typeDef.fields.map((field) => (
                        <div key={field.name} className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 mt-1 flex-shrink-0" />
                          <div>
                            <div className="font-mono text-sm">
                              {field.name}: <span className="text-blue-600">{field.type}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {field.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}