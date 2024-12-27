import { Database, ArrowRight, Eye } from "lucide-react"
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
import { useState, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import ReactMarkdown from 'react-markdown'

// Definición de tipos
interface TableInfo {
  name: string
  description: string
  fields: string[]
  path: string
  content: string
}

export function DatabaseStructure() {
  const [tables, setTables] = useState<TableInfo[]>([])
  const [selectedTable, setSelectedTable] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTableDocumentation = async () => {
      try {
        // Cargar la lista de tablas desde README.md
        const readmeResponse = await fetch('/docs/database/README.md')
        const readmeContent = await readmeResponse.text()
        
        // Extraer las tablas mencionadas en el README
        const tableFiles = readmeContent.match(/- `.*\.md`/g) || []
        
        // Cargar la documentación de cada tabla
        const loadedTables = await Promise.all(
          tableFiles.map(async (file) => {
            const filePath = file.replace(/- `(.*)`.*/g, '$1')
            const response = await fetch(`/docs/database/${filePath}`)
            const content = await response.text()
            
            // Extraer información básica del contenido markdown
            const nameMatch = content.match(/# Tabla: (.*)/i)
            const descriptionMatch = content.match(/\n\n(.*?)\n\n/i)
            const fieldsMatch = content.match(/\|\s*([^|]+)\s*\|/g)
            
            const fields = fieldsMatch 
              ? fieldsMatch
                  .slice(2) // Saltar el encabezado de la tabla
                  .map(field => field.replace(/\|/g, '').trim())
                  .filter(field => field !== '----' && field !== '') // Eliminar líneas de separación
              : []

            return {
              name: nameMatch ? nameMatch[1].trim() : filePath,
              description: descriptionMatch ? descriptionMatch[1].trim() : '',
              fields: fields.slice(0, 5), // Mostrar solo los primeros 5 campos
              path: filePath,
              content
            }
          })
        )

        // Ordenar las tablas alfabéticamente por nombre
        const sortedTables = loadedTables.sort((a, b) => a.name.localeCompare(b.name))
        setTables(sortedTables)
        setLoading(false)
      } catch (error) {
        console.error('Error loading documentation:', error)
        setLoading(false)
      }
    }

    loadTableDocumentation()
  }, [])

  const getTableContent = (tableName: string) => {
    return tables.find(table => table.name === tableName)?.content || ""
  }

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
            Visualización de las tablas y sus relaciones en Supabase
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tables.map((table) => (
              <Card key={table.name} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{table.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{table.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Campos principales:</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {table.fields.map((field, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <ArrowRight className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate">{field}</span>
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
                            <div className="prose prose-sm dark:prose-invert">
                              <ReactMarkdown>{getTableContent(table.name)}</ReactMarkdown>
                            </div>
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