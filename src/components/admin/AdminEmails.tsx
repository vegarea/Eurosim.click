import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { EmailTemplateDialog } from "./emails/EmailTemplateDialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmailLogs } from "./emails/EmailLogs"
import { ApiKeySetup } from "./emails/ApiKeySetup"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { filterTemplatesByType } from "./emails/utils/filterTemplates"
import { useEmailTemplates } from "./emails/hooks/useEmailTemplates"
import { useEmailTemplate } from "./emails/hooks/useEmailTemplate"
import { EmailTemplateList } from "./emails/components/EmailTemplateList"

export function AdminEmails() {
  const { 
    templates, 
    isLoading, 
    loadTemplates,
    handleCreateDefaultTemplates 
  } = useEmailTemplates()

  const {
    selectedTemplate,
    setSelectedTemplate,
    isDialogOpen,
    setIsDialogOpen,
    handleSaveTemplate
  } = useEmailTemplate()

  const handleEditTemplate = (template: EmailTemplate) => {
    setSelectedTemplate(template)
    setIsDialogOpen(true)
  }

  const handleAddTemplate = () => {
    setSelectedTemplate(null)
    setIsDialogOpen(true)
  }

  const handleSave = async (template: EmailTemplate) => {
    const success = await handleSaveTemplate(template)
    if (success) {
      loadTemplates()
    }
  }

  if (isLoading) {
    return <div>Cargando plantillas...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Configuración de Emails</h1>
        <div className="flex gap-2">
          {templates.length === 0 && (
            <Button onClick={handleCreateDefaultTemplates} variant="outline">
              Crear Plantillas Predefinidas
            </Button>
          )}
          <Button onClick={handleAddTemplate} className="gap-2">
            <Plus className="h-4 w-4" />
            Añadir Plantilla
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Prueba de Configuración</CardTitle>
        </CardHeader>
        <CardContent>
          <ApiKeySetup />
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Todos los Emails</TabsTrigger>
          <TabsTrigger value="physical">SIM Física</TabsTrigger>
          <TabsTrigger value="esim">E-SIM</TabsTrigger>
          <TabsTrigger value="logs">Logs de Envío</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <EmailTemplateList 
            templates={templates}
            onEdit={handleEditTemplate}
          />
        </TabsContent>

        <TabsContent value="physical">
          <EmailTemplateList 
            templates={filterTemplatesByType(templates, "physical")}
            onEdit={handleEditTemplate}
          />
        </TabsContent>

        <TabsContent value="esim">
          <EmailTemplateList 
            templates={filterTemplatesByType(templates, "esim")}
            onEdit={handleEditTemplate}
          />
        </TabsContent>

        <TabsContent value="logs">
          <EmailLogs />
        </TabsContent>
      </Tabs>

      <EmailTemplateDialog 
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        template={selectedTemplate}
        onSave={handleSave}
      />
    </div>
  )
}