import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { EmailTemplate } from "../types"
import { useToast } from "@/components/ui/use-toast"
import { createDefaultTemplates } from "../utils/createDefaultTemplates"

export const useEmailTemplates = () => {
  const [templates, setTemplates] = useState<EmailTemplate[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  const loadTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('email_templates')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      const transformedData = data.map(template => ({
        ...template,
        cc_emails: Array.isArray(template.cc_emails) ? template.cc_emails : 
                  template.cc_emails ? JSON.parse(template.cc_emails as string) : []
      })) as EmailTemplate[]

      setTemplates(transformedData)
    } catch (error) {
      console.error('Error al cargar plantillas:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron cargar las plantillas de email"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateDefaultTemplates = async () => {
    try {
      await createDefaultTemplates()
      toast({
        title: "Plantillas creadas",
        description: "Las plantillas predefinidas se han creado correctamente"
      })
      loadTemplates()
    } catch (error) {
      console.error('Error al crear plantillas:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron crear las plantillas predefinidas"
      })
    }
  }

  useEffect(() => {
    loadTemplates()
  }, [])

  return {
    templates,
    isLoading,
    loadTemplates,
    handleCreateDefaultTemplates
  }
}