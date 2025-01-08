import { EmailTemplate } from "../types"

/**
 * Verifica si una plantilla es aplicable para un tipo específico de producto
 */
export const isTemplateApplicableForType = (template: EmailTemplate, type: EmailTemplate['type']) => {
  return template.type === type || template.type === 'both'
}

/**
 * Filtra las plantillas por tipo y estado
 */
export const filterTemplatesByTypeAndStatus = (
  templates: EmailTemplate[],
  type: EmailTemplate['type'],
  status: EmailTemplate['status']
) => {
  return templates.filter(template => 
    isTemplateApplicableForType(template, type) && 
    template.status === status &&
    template.is_active
  )
}