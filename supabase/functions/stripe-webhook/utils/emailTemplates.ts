import { createClient } from '@supabase/supabase-js';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function getSiteLogo(): Promise<string> {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('logo_url')
      .maybeSingle();

    if (error) {
      console.error('Error fetching logo:', error);
      return '/logo.png'; // URL de respaldo
    }

    return data?.logo_url || '/logo.png';
  } catch (error) {
    console.error('Error in getSiteLogo:', error);
    return '/logo.png';
  }
}

export const getOrderConfirmationEmail = async (order: any, product: any, customer: any, formattedAmount: string) => {
  const logoUrl = await getSiteLogo();
  const isPhysical = order.type === 'physical';
  const activationDate = order.activation_date 
    ? new Date(order.activation_date).toLocaleDateString('es-MX', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    : 'No especificada';

  const shippingSection = isPhysical && order.shipping_address ? `
    <div style="margin-top: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
      <h3 style="color: #1a1f2c; margin-bottom: 10px;">Dirección de envío:</h3>
      <p style="margin: 5px 0;">${order.shipping_address.street}</p>
      <p style="margin: 5px 0;">${order.shipping_address.city}, ${order.shipping_address.state}</p>
      <p style="margin: 5px 0;">${order.shipping_address.postal_code}</p>
    </div>
    <p style="margin-top: 15px; color: #4a5568;">
      Tu envío se está procesando y te notificaremos por email cuando haya sido enviado con tu número de guía.
    </p>
  ` : '';

  const activationInfo = `
    <div style="margin-top: 20px; padding: 15px; background-color: #e3f2fd; border-radius: 8px;">
      <h3 style="color: #1a1f2c; margin-bottom: 10px;">Fecha de Activación:</h3>
      <p style="margin: 5px 0; font-weight: bold;">${activationDate}</p>
      <p style="margin-top: 15px; font-weight: bold;">
        - A partir de esta fecha comenzarán a contar los 30 días de Vigencia en tus datos asignados, podrás siempre recargar durante la vigencia.
      </p>
      ${!isPhysical ? `
        <p style="margin-top: 10px; font-weight: bold;">
          - Recuerda que recibirás tu código QR de activación vía email un día antes de tu fecha de activación además de las instrucciones simples para activar tus datos
        </p>
      ` : ''}
    </div>
  `;

  const processingMessage = isPhysical 
    ? "Tu SIM está procesando y recibirás un email con tu número de seguimiento en las próximas 48 hrs."
    : "Tu compra ha sido procesada correctamente y recibirás tu código QR un día antes de tu fecha de activación con los pasos simples para que instales tu eSIM.";

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Confirmación de Compra - EuroSim</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <img src="${logoUrl}" alt="EuroSim Logo" style="max-width: 200px; height: auto;">
      </div>
      
      <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h1 style="color: #1a1f2c; margin-bottom: 20px; text-align: center;">¡Gracias por tu compra!</h1>
        
        <p style="margin-bottom: 15px;">Hola ${customer.name},</p>
        
        <p style="margin-bottom: 15px;">Hemos recibido tu pago correctamente para el pedido:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 5px 0;"><strong>Número de pedido:</strong> ${order.id}</p>
          <p style="margin: 5px 0;"><strong>Total pagado:</strong> ${formattedAmount}</p>
        </div>

        <div style="margin-top: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
          <h3 style="color: #1a1f2c; margin-bottom: 10px;">Detalles del producto:</h3>
          <p style="margin: 5px 0;"><strong>Producto:</strong> ${product.title}</p>
          <p style="margin: 5px 0;"><strong>Tipo:</strong> ${isPhysical ? 'SIM Física' : 'eSIM'}</p>
          <p style="margin: 5px 0;"><strong>Datos en Europa:</strong> ${product.data_eu_gb}GB</p>
          <p style="margin: 5px 0;"><strong>Datos en España:</strong> ${product.data_es_gb}GB</p>
          <p style="margin: 5px 0;"><strong>Validez:</strong> ${product.validity_days} días</p>
        </div>

        ${shippingSection}
        ${activationInfo}
        
        <div style="margin-top: 30px; text-align: center;">
          <p style="color: #666;">${processingMessage}</p>
          
          <p style="margin-top: 20px;">Si tienes dudas o preguntas sobre tu SIM no dudes en 
            <a href="https://eurosim.click/contact" style="color: #E02653; text-decoration: none;">contactarnos</a>
          </p>

          <p style="color: #666; font-size: 14px; margin-top: 20px;">¡Gracias por tu compra y feliz viaje!</p>
        </div>
      </div>
    </body>
    </html>
  `;
};