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

// Función para validar la API key
export const validateApiKey = async (): Promise<boolean> => {
  try {
    const { data } = await supabase.functions.invoke('send-email', {
      body: {
        templateId: 'test',
        to: ['test@test.com']
      }
    });
    return !!data;
  } catch {
    return false;
  }
};