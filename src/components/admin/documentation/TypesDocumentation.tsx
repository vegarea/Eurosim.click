import { Code2, Database, FileJson } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DatabaseTypes } from "./types/DatabaseTypes"
import { InterfaceTypes } from "./types/InterfaceTypes"
import { EnumTypes } from "./types/EnumTypes"

export function TypesDocumentation() {
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
                <FileJson className="h-4 w-4" />
                Tipos de Interfaz
              </TabsTrigger>
              <TabsTrigger value="enums" className="flex items-center gap-2">
                <FileJson className="h-4 w-4" />
                Enumeraciones
              </TabsTrigger>
            </TabsList>

            <TabsContent value="database">
              <DatabaseTypes />
            </TabsContent>

            <TabsContent value="interface">
              <InterfaceTypes />
            </TabsContent>

            <TabsContent value="enums">
              <EnumTypes />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}