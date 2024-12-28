import {
  Database,
  FileText,
  ListTree,
  LayoutDashboard,
  Code2,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DatabaseStructure } from "./DatabaseStructure"
import { ProjectWorkflow } from "./ProjectWorkflow"
import { DocumentationOverview } from "./DocumentationOverview"
import { TypesDocumentation } from "./TypesDocumentation"

export function AdminDocumentation() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Documentación del Proyecto</h1>
        <p className="text-muted-foreground">
          Visualización y gestión de la documentación, estructura y flujos del proyecto
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-brand-50">
          <TabsTrigger value="overview" className="data-[state=active]:bg-white">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Vista General
          </TabsTrigger>
          <TabsTrigger value="database" className="data-[state=active]:bg-white">
            <Database className="mr-2 h-4 w-4" />
            Base de Datos
          </TabsTrigger>
          <TabsTrigger value="workflow" className="data-[state=active]:bg-white">
            <ListTree className="mr-2 h-4 w-4" />
            Flujos de Trabajo
          </TabsTrigger>
          <TabsTrigger value="types" className="data-[state=active]:bg-white">
            <Code2 className="mr-2 h-4 w-4" />
            Tipos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <DocumentationOverview />
        </TabsContent>

        <TabsContent value="database">
          <DatabaseStructure />
        </TabsContent>

        <TabsContent value="workflow">
          <ProjectWorkflow />
        </TabsContent>

        <TabsContent value="types">
          <TypesDocumentation />
        </TabsContent>
      </Tabs>
    </div>
  )
}