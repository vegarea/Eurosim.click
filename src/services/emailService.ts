const BREVO_API_ENDPOINT = 'https://api.brevo.com/v3/smtp/email';

export const sendEmail = async (
  to: string[],
  subject: string,
  htmlContent: string,
  sender = { name: "Tu Empresa", email: "noreply@tuempresa.com" }
) => {
  const apiKey = localStorage.getItem('BREVO_API_KEY');
  
  if (!apiKey) {
    throw new Error('Brevo API key no configurada');
  }

  const payload = {
    sender,
    to: to.map(email => ({ email })),
    subject,
    htmlContent
  };

  try {
    const response = await fetch(BREVO_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al enviar email');
    }

    const data = await response.json();
    console.log('Email enviado:', data);
    return data;
  } catch (error) {
    console.error('Error al enviar email:', error);
    throw error;
  }
};

export const setBrevoApiKey = (key: string) => {
  localStorage.setItem('BREVO_API_KEY', key);
};

// Función para validar la API key
export const validateApiKey = async (key: string): Promise<boolean> => {
  try {
    const response = await fetch('https://api.brevo.com/v3/account', {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'api-key': key
      }
    });
    return response.ok;
  } catch {
    return false;
  }
};