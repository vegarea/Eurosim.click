import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { EmailTemplateDialog } from "./emails/EmailTemplateDialog"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmailTemplate } from "./emails/types"
import { EmailTemplateCard } from "./emails/EmailTemplateCard"
import { initialTemplates } from "./emails/initialData"
import { EmailLogs } from "./emails/EmailLogs"

export function AdminEmails() {
  const [templates, setTemplates] = useState<EmailTemplate[]>(initialTemplates)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null)

  const handleEditTemplate = (template: EmailTemplate) => {
    setSelectedTemplate(template)
    setIsDialogOpen(true)
  }

  const handleAddTemplate = () => {
    setSelectedTemplate(null)
    setIsDialogOpen(true)
  }

  const filterTemplatesByType = (type: EmailTemplate["type"]) => {
    return templates.filter(template => template.type === type || template.type === "both")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Configuración de Emails</h1>
        <Button onClick={handleAddTemplate} className="gap-2">
          <Plus className="h-4 w-4" />
          Añadir Plantilla
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Todos los Emails</TabsTrigger>
          <TabsTrigger value="physical">SIM Física</TabsTrigger>
          <TabsTrigger value="esim">E-SIM</TabsTrigger>
          <TabsTrigger value="logs">Logs de Envío</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {templates.map((template) => (
            <EmailTemplateCard 
              key={template.id} 
              template={template} 
              onEdit={handleEditTemplate}
            />
          ))}
        </TabsContent>

        <TabsContent value="physical" className="space-y-4">
          {filterTemplatesByType("physical").map((template) => (
            <EmailTemplateCard 
              key={template.id} 
              template={template} 
              onEdit={handleEditTemplate}
            />
          ))}
        </TabsContent>

        <TabsContent value="esim" className="space-y-4">
          {filterTemplatesByType("esim").map((template) => (
            <EmailTemplateCard 
              key={template.id} 
              template={template} 
              onEdit={handleEditTemplate}
            />
          ))}
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <EmailLogs />
        </TabsContent>
      </Tabs>

      <EmailTemplateDialog 
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        template={selectedTemplate}
        onSave={(template) => {
          if (selectedTemplate) {
            setTemplates(templates.map(t => 
              t.id === template.id ? template : t
            ))
          } else {
            setTemplates([...templates, template])
          }
          setIsDialogOpen(false)
        }}
      />
    </div>
  )
}