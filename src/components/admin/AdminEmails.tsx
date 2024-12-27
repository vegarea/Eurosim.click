import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Plus } from "lucide-react"
import { EmailTemplateDialog } from "./emails/EmailTemplateDialog"
import { useState } from "react"

interface EmailTemplate {
  id: string
  name: string
  subject: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  description: string
}

const initialTemplates: EmailTemplate[] = [
  {
    id: "order-confirmation",
    name: "Confirmación de Pedido",
    subject: "¡Gracias por tu compra!",
    status: "pending",
    description: "Email enviado inmediatamente después de realizar una compra exitosa"
  },
  {
    id: "order-processing",
    name: "Pedido en Proceso",
    subject: "Tu pedido está siendo procesado",
    status: "processing",
    description: "Notificación cuando el pedido comienza a ser procesado"
  },
  {
    id: "shipping-confirmation",
    name: "Envío Confirmado",
    subject: "¡Tu pedido está en camino!",
    status: "shipped",
    description: "Confirmación cuando el pedido ha sido enviado, incluye detalles de seguimiento"
  },
  {
    id: "esim-delivery",
    name: "Entrega de E-SIM",
    subject: "Tu E-SIM está lista",
    status: "delivered",
    description: "Email con los datos de activación de la E-SIM"
  },
  {
    id: "order-delivered",
    name: "Pedido Entregado",
    subject: "¡Tu pedido ha sido entregado!",
    status: "delivered",
    description: "Confirmación de entrega exitosa del pedido"
  },
  {
    id: "order-cancelled",
    name: "Pedido Cancelado",
    subject: "Pedido Cancelado",
    status: "cancelled",
    description: "Notificación de cancelación del pedido"
  }
]

const getStatusColor = (status: EmailTemplate["status"]) => {
  const colors = {
    pending: "bg-[#8E9196] hover:bg-[#8E9196]/90",
    processing: "bg-[#9b87f5] hover:bg-[#9b87f5]/90",
    shipped: "bg-[#7E69AB] hover:bg-[#7E69AB]/90",
    delivered: "bg-[#6E59A5] hover:bg-[#6E59A5]/90",
    cancelled: "bg-[#1A1F2C] hover:bg-[#1A1F2C]/90"
  }
  return colors[status]
}

const getStatusLabel = (status: EmailTemplate["status"]) => {
  const labels = {
    pending: "Pendiente",
    processing: "En Proceso",
    shipped: "Enviado",
    delivered: "Entregado",
    cancelled: "Cancelado"
  }
  return labels[status]
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Configuración de Emails</h1>
        <Button onClick={handleAddTemplate} className="gap-2">
          <Plus className="h-4 w-4" />
          Añadir Plantilla
        </Button>
      </div>

      <div className="grid gap-4">
        {templates.map((template) => (
          <Card key={template.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">{template.name}</CardTitle>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleEditTemplate(template)}
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
                  <Badge className={getStatusColor(template.status)}>
                    {getStatusLabel(template.status)}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{template.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

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