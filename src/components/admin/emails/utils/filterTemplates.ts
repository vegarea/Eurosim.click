import { EmailTemplate } from "../types"
import { isTemplateApplicableForType } from "./templateUtils"

export const filterTemplatesByType = (
  templates: EmailTemplate[],
  type: EmailTemplate['type']
): EmailTemplate[] => {
  return templates.filter(template => isTemplateApplicableForType(template, type))
}