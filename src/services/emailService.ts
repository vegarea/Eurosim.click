import * as Brevo from '@getbrevo/brevo';

let apiInstance = new Brevo.TransactionalEmailsApi();
let apiKey = localStorage.getItem('BREVO_API_KEY');

if (apiKey) {
  apiInstance.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, apiKey);
}

export const sendEmail = async (
  to: string[],
  subject: string,
  htmlContent: string,
  sender = { name: "Tu Empresa", email: "noreply@tuempresa.com" }
) => {
  if (!apiKey) {
    throw new Error('Brevo API key no configurada');
  }

  const sendSmtpEmail = new Brevo.SendSmtpEmail();
  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = htmlContent;
  sendSmtpEmail.sender = sender;
  sendSmtpEmail.to = to.map(email => ({ email }));

  try {
    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('Email enviado:', response);
    return response;
  } catch (error) {
    console.error('Error al enviar email:', error);
    throw error;
  }
};

export const setBrevoApiKey = (key: string) => {
  localStorage.setItem('BREVO_API_KEY', key);
  apiKey = key;
  apiInstance.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKeys.apiKey, key);
};