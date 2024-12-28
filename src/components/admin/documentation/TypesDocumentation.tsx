import { Code2, Check, AlertTriangle, ArrowRight, Database, Components, FileJson } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TypeDefinition {
  name: string;
  status: "verified" | "pending" | "warning";
  description: string;
  fields: Array<{
    name: string;
    type: string;
    description: string;
    supabaseField?: string;
  }>;
}

const databaseTypes: TypeDefinition[] = [
  {
    name: "Order",
    status: "pending",
    description: "Estructura de pedidos y transacciones",
    fields: [
      { 
        name: "id", 
        type: "string", 
        description: "Identificador único UUID",
        supabaseField: "id" 
      },
      { 
        name: "shippingAddress", 
        type: "ShippingAddress", 
        description: "Dirección de envío",
        supabaseField: "shipping_address" 
      },
      { 
        name: "status", 
        type: "OrderStatus", 
        description: "Estado actual del pedido",
        supabaseField: "status" 
      }
    ]
  },
  {
    name: "Customer",
    status: "pending",
    description: "Información de clientes",
    fields: [
      { 
        name: "id", 
        type: "string", 
        description: "Identificador único UUID",
        supabaseField: "id" 
      },
      { 
        name: "fullName", 
        type: "string", 
        description: "Nombre completo",
        supabaseField: "full_name" 
      }
    ]
  }
]

const interfaceTypes: TypeDefinition[] = [
  {
    name: "OrderDisplay",
    status: "warning",
    description: "Tipo para mostrar pedidos en la UI",
    fields: [
      { name: "id", type: "string", description: "ID del pedido" },
      { name: "formattedDate", type: "string", description: "Fecha formateada para mostrar" },
      { name: "displayTotal", type: "string", description: "Total formateado con moneda" }
    ]
  }
]

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

  const TypeCard = ({ type }: { type: TypeDefinition }) => (
    <Card key={type.name} className="border-l-4 border-l-primary">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon(type.status)}
            <CardTitle className="text-lg">{type.name}</CardTitle>
          </div>
          {getStatusBadge(type.status)}
        </div>
        <CardDescription>{type.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] w-full rounded-md border p-4">
          <div className="space-y-4">
            {type.fields.map((field) => (
              <div key={field.name} className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 mt-1 flex-shrink-0" />
                <div>
                  <div className="font-mono text-sm">
                    {field.name}: <span className="text-blue-600">{field.type}</span>
                    {field.supabaseField && field.supabaseField !== field.name && (
                      <span className="text-gray-500 ml-2">
                        → {field.supabaseField}
                      </span>
                    )}
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
  );

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
          <Tabs defaultValue="database" className="space-y-4">
            <TabsList>
              <TabsTrigger value="database" className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                Tipos de Base de Datos
              </TabsTrigger>
              <TabsTrigger value="interface" className="flex items-center gap-2">
                <Components className="h-4 w-4" />
                Tipos de Interfaz
              </TabsTrigger>
              <TabsTrigger value="enums" className="flex items-center gap-2">
                <FileJson className="h-4 w-4" />
                Enumeraciones
              </TabsTrigger>
            </TabsList>

            <TabsContent value="database" className="space-y-4">
              {databaseTypes.map((type) => (
                <TypeCard key={type.name} type={type} />
              ))}
            </TabsContent>

            <TabsContent value="interface" className="space-y-4">
              {interfaceTypes.map((type) => (
                <TypeCard key={type.name} type={type} />
              ))}
            </TabsContent>

            <TabsContent value="enums" className="space-y-4">
              {enumTypes.map((type) => (
                <TypeCard key={type.name} type={type} />
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}