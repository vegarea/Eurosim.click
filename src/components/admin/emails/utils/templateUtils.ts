import { EmailTemplate } from "../types"

export const filterTemplatesByTypeAndStatus = (
  templates: EmailTemplate[],
  type: EmailTemplate['type'],
  status: EmailTemplate['status']
): EmailTemplate[] => {
  return templates.filter(template => 
    (template.type === type || template.type === 'both') && 
    template.status === status &&
    template.is_active
  )
}

export const filterTemplatesByType = (
  templates: EmailTemplate[],
  type: EmailTemplate['type']
): EmailTemplate[] => {
  return templates.filter(template => 
    template.type === type || template.type === 'both'
  )
}