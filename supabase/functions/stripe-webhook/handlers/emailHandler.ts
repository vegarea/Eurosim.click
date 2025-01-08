import { createClient } from '@supabase/supabase-js';
import { Customer } from '../types/customers';
import { Order } from '../types/orders';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

export const sendOrderConfirmationEmail = async (
  customer: Customer,
  order: Order
) => {
  try {
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
      },
      body: JSON.stringify({
        from: 'EuroSim <noreply@eurosim.click>',
        to: [customer.email],
        subject: '¡Gracias por tu compra en EuroSim!',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Confirmación de Compra - EuroSim</title>
            </head>
            <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6; background-color: #f4f4f4;">
              <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
                <div style="text-align: center; margin-bottom: 30px;">
                  <img src="https://eurosim.click/wp-content/uploads/2021/11/website.png" alt="EuroSim Logo" style="max-width: 200px; height: auto;">
                </div>
                
                <div style="background-color: #E02653; color: white; padding: 20px; text-align: center; border-radius: 8px; margin-bottom: 30px;">
                  <h1 style="margin: 0; font-size: 24px;">¡Gracias por tu compra!</h1>
                </div>

                <div style="padding: 20px; border: 1px solid #e1e1e1; border-radius: 8px; margin-bottom: 20px;">
                  <p style="margin-bottom: 15px;">Hola ${customer.name},</p>
                  
                  <p style="margin-bottom: 15px;">Hemos recibido tu pago correctamente para el pedido:</p>
                  
                  <div style="background-color: #f8f8f8; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                    <p style="margin: 0; font-weight: bold;">Número de Pedido: #${order.id}</p>
                    <p style="margin: 10px 0 0 0; font-size: 18px; color: #E02653;">
                      Total pagado: MX$${(order.total_amount / 100).toFixed(2)}
                    </p>
                  </div>

                  <p style="margin-bottom: 15px;">Pronto recibirás más información sobre tu pedido.</p>
                </div>

                <div style="text-align: center; padding: 20px; background-color: #f8f8f8; border-radius: 8px;">
                  <p style="margin: 0; color: #666666;">Gracias por confiar en EuroSim</p>
                </div>
              </div>
            </body>
          </html>
        `
      }),
    });

    if (!emailResponse.ok) {
      console.error('❌ Error sending confirmation email:', await emailResponse.text());
    } else {
      console.log('✉️ Confirmation email sent successfully');
    }
  } catch (emailError) {
    console.error('❌ Error in email sending:', emailError);
  }
};