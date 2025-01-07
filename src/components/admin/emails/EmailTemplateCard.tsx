import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Mail, MailCheck, MailWarning, MailX } from "lucide-react"
import { EmailTemplate, getStatusColor, getStatusLabel } from "./types"

interface EmailTemplateCardProps {
  template: EmailTemplate
  onEdit: (template: EmailTemplate) => void
}

export function EmailTemplateCard({ template, onEdit }: EmailTemplateCardProps) {
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
              <StatusIcon />
              {getStatusLabel(template.status)}
            </Badge>
          </div>
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
  )
}