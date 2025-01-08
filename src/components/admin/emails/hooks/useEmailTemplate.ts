import { useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import { EmailTemplate } from "../types"
import { useToast } from "@/components/ui/use-toast"

export const useEmailTemplate = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const handleSaveTemplate = async (template: EmailTemplate) => {
    try {
      const templateToSave = {
        ...template,
        cc_emails: Array.isArray(template.cc_emails) ? template.cc_emails : []
      }

      if (selectedTemplate) {
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
      return true
    } catch (error) {
      console.error('Error al guardar plantilla:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo guardar la plantilla"
      })
      return false
    }
  }

  return {
    selectedTemplate,
    setSelectedTemplate,
    isDialogOpen,
    setIsDialogOpen,
    handleSaveTemplate
  }
}