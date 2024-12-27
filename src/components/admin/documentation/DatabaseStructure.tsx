import { Database, ArrowRight, FileText } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const tables = [
  {
    name: "Products",
    description: "Productos disponibles (SIMs físicas y eSIMs)",
    fields: ["id", "type", "title", "price", "features", "status"],
    path: "docs/database/products.md"
  },
  {
    name: "Orders",
    description: "Pedidos y transacciones",
    fields: ["id", "customer_id", "product_id", "status", "total_amount"],
    path: "docs/database/orders.md"
  },
  {
    name: "Customers",
    description: "Información de clientes",
    fields: ["id", "name", "email", "phone", "documentation"],
    path: "docs/database/customers.md"
  },
  {
    name: "Blog Posts",
    description: "Artículos del blog (manuales y AI)",
    fields: ["id", "title", "content", "status", "is_ai_generated"],
    path: "docs/database/blog-posts.md"
  },
  {
    name: "Blog Post Images",
    description: "Imágenes asociadas a los posts",
    fields: ["id", "post_id", "url", "is_featured"],
    path: "docs/database/blog-post-images.md"
  },
  {
    name: "Email Templates",
    description: "Plantillas de correo electrónico",
    fields: ["id", "name", "subject", "content", "type"],
    path: "docs/database/email-templates.md"
  }
]

export function DatabaseStructure() {
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
                      <a
                        href={table.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-primary hover:underline"
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        Ver documentación completa
                      </a>
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