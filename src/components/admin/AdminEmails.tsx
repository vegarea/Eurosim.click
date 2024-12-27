import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Plus, Mail, MailCheck, MailWarning, MailX } from "lucide-react"
import { EmailTemplateDialog } from "./emails/EmailTemplateDialog"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface EmailTemplate {
  id: string
  name: string
  subject: string
  status: "payment_pending" | "processing" | "shipped" | "delivered" | "cancelled"
  description: string
  type: "physical" | "esim" | "both"
  variables: string[]
}

const initialTemplates: EmailTemplate[] = [
  {
    id: "payment-confirmation",
    name: "Confirmación de Pago y Preparación",
    subject: "¡Gracias por tu compra! Tu pedido está en preparación",
    status: "processing",
    description: "Email enviado inmediatamente después de confirmar el pago exitoso",
    type: "both",
    variables: ["nombre_cliente", "numero_pedido", "detalles_plan", "total"]
  },
  {
    id: "shipping-confirmation",
    name: "Envío en Camino",
    subject: "¡Tu SIM física está en camino!",
    status: "shipped",
    description: "Notificación cuando la SIM física es enviada, incluye número de seguimiento",
    type: "physical",
    variables: ["nombre_cliente", "numero_pedido", "tracking_number", "courier", "direccion_envio"]
  },
  {
    id: "esim-delivery",
    name: "Entrega de E-SIM",
    subject: "¡Tu E-SIM está lista para activar!",
    status: "delivered",
    description: "Email con los datos de activación de la E-SIM e instrucciones detalladas",
    type: "esim",
    variables: ["nombre_cliente", "numero_pedido", "qr_code", "instrucciones_activacion", "codigo_activacion"]
  },
  {
    id: "physical-delivered",
    name: "SIM Física Entregada",
    subject: "¡Tu SIM física ha sido entregada!",
    status: "delivered",
    description: "Confirmación de entrega exitosa de la SIM física",
    type: "physical",
    variables: ["nombre_cliente", "numero_pedido", "fecha_entrega"]
  },
  {
    id: "order-cancelled",
    name: "Pedido Cancelado",
    subject: "Pedido Cancelado",
    status: "cancelled",
    description: "Notificación de cancelación del pedido y proceso de reembolso si aplica",
    type: "both",
    variables: ["nombre_cliente", "numero_pedido", "motivo_cancelacion", "info_reembolso"]
  }
]

const getStatusColor = (status: EmailTemplate["status"]) => {
  const colors = {
    payment_pending: "bg-[#8E9196] hover:bg-[#8E9196]/90",
    processing: "bg-[#9b87f5] hover:bg-[#9b87f5]/90",
    shipped: "bg-[#7E69AB] hover:bg-[#7E69AB]/90",
    delivered: "bg-[#6E59A5] hover:bg-[#6E59A5]/90",
    cancelled: "bg-[#1A1F2C] hover:bg-[#1A1F2C]/90"
  }
  return colors[status]
}

const getStatusLabel = (status: EmailTemplate["status"]) => {
  const labels = {
    payment_pending: "Pago Pendiente",
    processing: "En Preparación",
    shipped: "En Tránsito",
    delivered: "Entregado",
    cancelled: "Cancelado"
  }
  return labels[status]
}

const getStatusIcon = (status: EmailTemplate["status"]) => {
  const icons = {
    payment_pending: MailWarning,
    processing: Mail,
    shipped: Mail,
    delivered: MailCheck,
    cancelled: MailX
  }
  return icons[status]
}

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

interface EmailTemplateCardProps {
  template: EmailTemplate
  onEdit: (template: EmailTemplate) => void
}

function EmailTemplateCard({ template, onEdit }: EmailTemplateCardProps) {
  const StatusIcon = getStatusIcon(template.status)
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">{template.name}</CardTitle>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onEdit(template)}
        >
          <Edit className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Asunto:</span>
            <span className="font-medium text-foreground">{template.subject}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Estado:</span>
            <Badge className={`flex items-center gap-1.5 ${getStatusColor(template.status)}`}>
              <StatusIcon className="h-3 w-3" />
              {getStatusLabel(template.status)}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{template.description}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {template.variables.map((variable) => (
              <Badge key={variable} variant="outline" className="text-xs">
                {`{${variable}}`}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}