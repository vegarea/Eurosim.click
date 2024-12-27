import { Database, ArrowRight, FileText, Eye } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"

const tables = [
  {
    name: "Products",
    description: "Productos disponibles (SIMs físicas y eSIMs)",
    fields: ["id", "type", "title", "price", "features", "status"],
    path: "docs/database/products.md",
    content: `# Tabla: Products

Esta tabla almacena la información de los productos disponibles en la plataforma, incluyendo tanto SIMs físicas como eSIMs.

## Estructura

| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| id | uuid | Identificador único del producto | ✅ |
| type | enum | Tipo de producto (physical/esim) | ✅ |
| title | text | Nombre del producto | ✅ |
| description | text | Descripción detallada | ✅ |
| price | integer | Precio en centavos | ✅ |
| features | text[] | Lista de características | ✅ |
| europe_gb | integer | GB disponibles en Europa | ❌ |
| spain_gb | integer | GB disponibles en España | ❌ |
| created_at | timestamp | Fecha de creación | ✅ |
| updated_at | timestamp | Fecha de última actualización | ✅ |
| status | enum | Estado del producto (active/inactive) | ✅ |
| stock | integer | Cantidad disponible (solo SIMs físicas) | ❌ |
| metadata | jsonb | Información adicional flexible | ❌ |`
  },
  {
    name: "Orders",
    description: "Pedidos y transacciones",
    fields: ["id", "customer_id", "product_id", "status", "total_amount"],
    path: "docs/database/orders.md",
    content: "# Tabla: Orders\n\nDocumentación detallada de la tabla Orders..."
  },
  {
    name: "Customers",
    description: "Información de clientes",
    fields: ["id", "name", "email", "phone", "documentation"],
    path: "docs/database/customers.md",
    content: `# Tabla: Customers

Esta tabla almacena la información de los clientes registrados en la plataforma.

## Estructura

| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| id | uuid | Identificador único del cliente | ✅ |
| name | text | Nombre completo del cliente | ✅ |
| email | text | Correo electrónico | ✅ |
| phone | text | Número de teléfono | ❌ |
| passport_number | text | Número de pasaporte para documentación UE | ❌ |
| birth_date | date | Fecha de nacimiento | ❌ |
| gender | enum | Género (M/F) | ❌ |
| default_shipping_address | jsonb | Dirección de envío predeterminada | ❌ |
| billing_address | jsonb | Dirección de facturación | ❌ |
| preferred_language | text | Idioma preferido para comunicaciones | ❌ |
| marketing_preferences | jsonb | Preferencias de marketing y comunicación | ❌ |`
  },
  {
    name: "Blog Posts",
    description: "Artículos del blog (manuales y AI)",
    fields: ["id", "title", "content", "status", "is_ai_generated"],
    path: "docs/database/blog-posts.md",
    content: "# Tabla: Blog Posts\n\nDocumentación detallada de la tabla Blog Posts..."
  },
  {
    name: "Blog Post Images",
    description: "Imágenes asociadas a los posts",
    fields: ["id", "post_id", "url", "is_featured"],
    path: "docs/database/blog-post-images.md",
    content: "# Tabla: Blog Post Images\n\nDocumentación detallada de la tabla Blog Post Images..."
  },
  {
    name: "Email Templates",
    description: "Plantillas de correo electrónico",
    fields: ["id", "name", "subject", "content", "type"],
    path: "docs/database/email-templates.md",
    content: "# Tabla: Email Templates\n\nDocumentación detallada de la tabla Email Templates..."
  }
]

export function DatabaseStructure() {
  const [selectedTable, setSelectedTable] = useState<string | null>(null)

  const getTableContent = (tableName: string) => {
    return tables.find(table => table.name === tableName)?.content || ""
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            Estructura de la Base de Datos
          </CardTitle>
          <CardDescription>
            Visualización de las tablas y sus relaciones en Supabase
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tables.map((table) => (
              <Card key={table.name} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{table.name}</CardTitle>
                  <CardDescription>{table.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Campos principales:</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {table.fields.map((field) => (
                        <li key={field} className="flex items-center gap-2">
                          <ArrowRight className="h-3 w-3" />
                          {field}
                        </li>
                      ))}
                    </ul>
                    <div className="pt-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <button
                            onClick={() => setSelectedTable(table.name)}
                            className="inline-flex items-center text-sm text-primary hover:underline"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Ver documentación completa
                          </button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl max-h-[80vh]">
                          <DialogHeader>
                            <DialogTitle>Documentación: {table.name}</DialogTitle>
                            <DialogDescription>
                              Estructura detallada y relaciones de la tabla
                            </DialogDescription>
                          </DialogHeader>
                          <ScrollArea className="h-[60vh] w-full rounded-md border p-4">
                            <pre className="whitespace-pre-wrap font-mono text-sm">
                              {getTableContent(table.name)}
                            </pre>
                          </ScrollArea>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}