import { Database } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState, useEffect } from "react"
import { TableCard } from "./components/TableCard"
import { TableSearch } from "./components/TableSearch"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"

interface TableInfo {
  name: string
  description: string
  fields: string[]
  path: string
  content: string
  isConnected: boolean
}

export function DatabaseStructure() {
  const [tables, setTables] = useState<TableInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    const loadTableDocumentation = async () => {
      try {
        // Cargar todas las tablas documentadas desde los archivos MD
        const tableFiles = [
          { name: "Products", path: "/docs/database/products.md" },
          { name: "Orders", path: "/docs/database/orders.md" },
          { name: "Customers", path: "/docs/database/customers.md" },
          { name: "Blog Posts", path: "/docs/database/blog-posts.md" },
          { name: "Blog Post Images", path: "/docs/database/blog-post-images.md" },
          { name: "Email Templates", path: "/docs/database/email-templates.md" },
          { name: "Workflows", path: "/docs/database/workflows.md" },
          { name: "Workflow Categories", path: "/docs/database/workflow_categories.md" },
          { name: "Workflow Events", path: "/docs/database/workflow_events.md" },
          { name: "Auth Logs", path: "/docs/database/auth_logs.md" },
          { name: "Role Permissions", path: "/docs/database/role_permissions.md" },
          { name: "Order Items", path: "/docs/database/order_items.md" },
          { name: "Order Status History", path: "/docs/database/order_status_history.md" },
          { name: "Order Events", path: "/docs/database/order_events.md" },
          { name: "Payments", path: "/docs/database/payments.md" },
          { name: "Payment Methods", path: "/docs/database/payment_methods.md" },
          { name: "Payment Logs", path: "/docs/database/payment_logs.md" },
          { name: "Customer Documents", path: "/docs/database/customer_documents.md" },
          { name: "Document Validations", path: "/docs/database/document_validations.md" },
          { name: "Email Logs", path: "/docs/database/email_logs.md" },
          { name: "Order Notes", path: "/docs/database/order_notes.md" }
        ]
        
        console.log('Loading table files:', tableFiles)

        // Verificar qué tablas existen en Supabase
        const { data: existingTables, error: tablesError } = await supabase
          .from('information_schema.tables')
          .select('table_name')
          .eq('table_schema', 'public')
        
        if (tablesError) {
          console.error('Error fetching tables:', tablesError)
          throw tablesError
        }

        const existingTableNames = existingTables?.map(t => t.table_name.toLowerCase()) || []
        console.log('Existing tables in Supabase:', existingTableNames)
        
        const loadedTables = await Promise.all(
          tableFiles.map(async (file) => {
            try {
              const response = await fetch(file.path)
              if (!response.ok) {
                console.error(`Error loading ${file.path}: ${response.statusText}`)
                return null
              }
              const content = await response.text()
              
              const nameMatch = content.match(/# Tabla: (.*)/i)
              const descriptionMatch = content.match(/\n\n(.*?)\n\n/i)
              const fieldsMatch = content.match(/\|\s*([^|]+)\s*\|/g)
              
              const fields = fieldsMatch 
                ? fieldsMatch
                    .slice(2)
                    .map(field => field.replace(/\|/g, '').trim())
                    .filter(field => field !== '----' && field !== '')
                : []

              // Convertir el nombre de la tabla a formato snake_case para comparar
              const tableName = file.name.toLowerCase().replace(/ /g, '_').replace(/-/g, '_')
              const isConnected = existingTableNames.includes(tableName)

              return {
                name: nameMatch ? nameMatch[1].trim() : file.name,
                description: descriptionMatch ? descriptionMatch[1].trim() : '',
                fields: fields.slice(0, 5),
                path: file.path,
                content,
                isConnected
              }
            } catch (error) {
              console.error(`Error processing ${file.path}:`, error)
              return null
            }
          })
        )

        const validTables = loadedTables.filter((table): table is TableInfo => table !== null)
        const sortedTables = validTables.sort((a, b) => a.name.localeCompare(b.name))
        
        console.log('Loaded tables with connection status:', sortedTables)
        
        setTables(sortedTables)
        setLoading(false)

        // Mostrar toast con el resumen
        const connectedCount = sortedTables.filter(t => t.isConnected).length
        toast({
          title: "Estado de las tablas",
          description: `${connectedCount} de ${sortedTables.length} tablas están conectadas con Supabase.`,
          duration: 5000,
        })

      } catch (error) {
        console.error('Error loading documentation:', error)
        setLoading(false)
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudo cargar el estado de las tablas.",
        })
      }
    }

    loadTableDocumentation()
  }, [toast])

  const filteredTables = tables.filter(table => 
    table.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    table.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
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
            Visualización de las tablas documentadas y su estado de conexión con Supabase
          </CardDescription>
          <div className="mt-4">
            <TableSearch value={searchTerm} onChange={setSearchTerm} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTables.length > 0 ? (
              filteredTables.map((table) => (
                <TableCard key={table.name} table={table} />
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                No se encontraron tablas que coincidan con la búsqueda
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}