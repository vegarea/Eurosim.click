import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { EmailTemplateDialog } from "./emails/EmailTemplateDialog"
import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmailTemplate } from "./emails/types"
import { EmailTemplateCard } from "./emails/EmailTemplateCard"
import { EmailLogs } from "./emails/EmailLogs"
import { ApiKeySetup } from "./emails/ApiKeySetup"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"

export function AdminEmails() {
  const [templates, setTemplates] = useState<EmailTemplate[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadTemplates()
  }, [])

  const loadTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('email_templates')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      // Transformar los datos para asegurar que cc_emails sea siempre un array
      const transformedData = data.map(template => ({
        ...template,
        cc_emails: Array.isArray(template.cc_emails) ? template.cc_emails : 
                  template.cc_emails ? JSON.parse(template.cc_emails as string) : []
      })) as EmailTemplate[]

      setTemplates(transformedData)
    } catch (error) {
      console.error('Error al cargar plantillas:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron cargar las plantillas de email"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditTemplate = (template: EmailTemplate) => {
    setSelectedTemplate(template)
    setIsDialogOpen(true)
  }

  const handleAddTemplate = () => {
    setSelectedTemplate(null)
    setIsDialogOpen(true)
  }

  const handleSaveTemplate = async (template: EmailTemplate) => {
    try {
      // Asegurarse de que cc_emails sea un array válido antes de guardar
      const templateToSave = {
        ...template,
        cc_emails: Array.isArray(template.cc_emails) ? template.cc_emails : []
      }

      if (selectedTemplate) {
        // Actualizar plantilla existente
        const { error } = await supabase
          .from('email_templates')
          .update(templateToSave)
          .eq('id', template.id)

        if (error) throw error

        toast({
          title: "Plantilla actualizada",
          description: "La plantilla se actualizó correctamente"
        })
      } else {
        // Crear nueva plantilla
        const { error } = await supabase
          .from('email_templates')
          .insert(templateToSave)

        if (error) throw error

        toast({
          title: "Plantilla creada",
          description: "La plantilla se creó correctamente"
        })
      }

      setIsDialogOpen(false)
      loadTemplates() // Recargar plantillas
    } catch (error) {
      console.error('Error al guardar plantilla:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo guardar la plantilla"
      })
    }
  }

  const filterTemplatesByType = (type: EmailTemplate["type"]) => {
    return templates.filter(template => template.type === type || template.type === "both")
  }

  if (isLoading) {
    return <div>Cargando plantillas...</div>
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
        onSave={handleSaveTemplate}
      />
    </div>
  )
}