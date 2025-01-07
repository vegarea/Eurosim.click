import { supabase } from "@/integrations/supabase/client";

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

// Función para validar la conexión
export const testEmailService = async (email: string) => {
  try {
    const { data, error } = await supabase.functions.invoke('send-email', {
      body: {
        to: [email],
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