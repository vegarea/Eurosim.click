import { EmailTemplate } from "../types"
import { EmailTemplateCard } from "../EmailTemplateCard"

interface EmailTemplateListProps {
  templates: EmailTemplate[]
  onEdit: (template: EmailTemplate) => void
}

export function EmailTemplateList({ templates, onEdit }: EmailTemplateListProps) {
  return (
    <div className="space-y-4">
      {templates.map((template) => (
        <EmailTemplateCard 
          key={template.id} 
          template={template} 
          onEdit={onEdit}
        />
      ))}
    </div>
  )
}