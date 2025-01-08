import { supabase } from "@/integrations/supabase/client"
import { EmailTemplate } from "../types"
import { Order } from "@/types/database/orders"
import { Customer } from "@/types/database/customers"
import { getTemplateVariables } from "../utils/getTemplateVariables"
import { useToast } from "@/components/ui/use-toast"

export const useSendEmail = () => {
  const { toast } = useToast()

  const sendEmail = async (
    template: EmailTemplate,
    order: Order,
    customer: Customer
  ) => {
    try {
      const variables = await getTemplateVariables(template, order, customer)

      const { error } = await supabase.functions.invoke('send-email', {
        body: {
          templateId: template.id,
          to: [customer.email],
          cc: template.cc_emails,
          variables
        }
      })

      if (error) throw error

      toast({
        title: "Email enviado",
        description: "El email se ha enviado correctamente"
      })

      return true
    } catch (error) {
      console.error('Error al enviar email:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo enviar el email"
      })
      return false
    }
  }

  return { sendEmail }
}