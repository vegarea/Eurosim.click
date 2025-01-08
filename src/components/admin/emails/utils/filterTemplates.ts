import { EmailTemplate } from "../types"

export const filterTemplatesByType = (
  templates: EmailTemplate[],
  type: EmailTemplate['type']
): EmailTemplate[] => {
  return templates.filter(template => 
    template.type === type || template.type === 'both'
  )
}