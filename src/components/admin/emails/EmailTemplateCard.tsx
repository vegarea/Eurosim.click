import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Eye, Mail, MailCheck, MailWarning, MailX } from "lucide-react"
import { EmailTemplate, getStatusColor, getStatusLabel } from "./types"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { TestEmailDialog } from "./TestEmailDialog"

interface EmailTemplateCardProps {
  template: EmailTemplate
  onEdit: (template: EmailTemplate) => void
}

export function EmailTemplateCard({ template, onEdit }: EmailTemplateCardProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isTestDialogOpen, setIsTestDialogOpen] = useState(false)

  const StatusIcon = () => {
    switch (template.status) {
      case "payment_pending":
        return <MailWarning className="h-3 w-3" />
      case "processing":
        return <Mail className="h-3 w-3" />
      case "shipped":
        return <Mail className="h-3 w-3" />
      case "delivered":
        return <MailCheck className="h-3 w-3" />
      case "cancelled":
        return <MailX className="h-3 w-3" />
      case "payment_failed":
        return <MailX className="h-3 w-3" />
    }
  }

  const getVariablesArray = (variables: EmailTemplate['variables']): string[] => {
    if (Array.isArray(variables)) {
      return variables.map(v => String(v))
    }
    return []
  }
  
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold">{template.name}</CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsPreviewOpen(true)}
              title="Vista previa"
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsTestDialogOpen(true)}
              title="Probar plantilla"
            >
              <Mail className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onEdit(template)}
              title="Editar"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
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
                <StatusIcon />
                {getStatusLabel(template.status)}
              </Badge>
            </div>
            {Array.isArray(template.cc_emails) && template.cc_emails.length > 0 && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">CC:</span>
                <div className="flex flex-wrap gap-1">
                  {template.cc_emails.map((email) => (
                    <Badge key={email} variant="outline" className="text-xs">
                      {email}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            <p className="text-sm text-muted-foreground">{template.description}</p>
            {template.variables && getVariablesArray(template.variables).length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {getVariablesArray(template.variables).map((variable) => (
                  <Badge key={variable} variant="outline" className="text-xs">
                    {`{${variable}}`}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-[800px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Vista Previa: {template.name}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <div 
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: template.content }} 
            />
          </div>
        </DialogContent>
      </Dialog>

      <TestEmailDialog 
        open={isTestDialogOpen}
        onOpenChange={setIsTestDialogOpen}
        template={template}
      />
    </>
  )
}