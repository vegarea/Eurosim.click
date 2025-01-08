import { supabase } from "@/integrations/supabase/client";
import { filterTemplatesByTypeAndStatus } from "@/components/admin/emails/utils/templateUtils";
import { EmailTemplate } from "@/components/admin/emails/types";

export const getEmailTemplate = async (
  type: EmailTemplate['type'],
  status: EmailTemplate['status']
): Promise<EmailTemplate | null> => {
  try {
    const { data: templates, error } = await supabase
      .from('email_templates')
      .select('*')
      .eq('is_active', true)

    if (error) throw error

    if (!templates || templates.length === 0) {
      console.error('No se encontraron plantillas activas')
      return null
    }

    // Usar la nueva función de filtrado que considera 'both'
    const applicableTemplates = filterTemplatesByTypeAndStatus(templates, type, status)

    if (applicableTemplates.length === 0) {
      console.error('❌ No se encontró plantilla para:', { type, status, is_active: true })
      return null
    }

    // Si hay múltiples plantillas, usar la primera
    return applicableTemplates[0]
  } catch (error) {
    console.error('Error al obtener plantilla de email:', error)
    return null
  }
}

export const sendEmail = async (
  templateId: string,
  to: string[],
  variables?: Record<string, any>
) => {
  try {
    const { data, error } = await supabase.functions.invoke('send-email', {
      body: {
        templateId,
        to,
        variables
      }
    })

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error al enviar email:', error);
    throw error;
  }
};

export const testEmailService = async (email: string) => {
  try {
    const { data, error } = await supabase.functions.invoke('send-email', {
      body: {
        to: [email],
        isTest: true,
        subject: "Prueba de Configuración de Email",
        html: `
          <h1>¡La configuración de email funciona correctamente!</h1>
          <p>Este es un email de prueba enviado desde EuroSim.</p>
          <p>Si estás recibiendo este mensaje, significa que la configuración de Resend está funcionando correctamente.</p>
        `
      }
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error al enviar email de prueba:', error);
    throw error;
  }
};