
// Importamos las utilidades necesarias desde los módulos
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Función para obtener la plantilla de email de confirmación de orden
export const getOrderConfirmationEmail = async (order: any, product: any, customer: any, formattedAmount: string) => {
  try {
    // Creamos el cliente de Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    const supabase = createClient(supabaseUrl!, supabaseKey!)
    
    // Verificamos si es una eSIM o una SIM física
    const isESim = product.type === 'esim' || order.type === 'esim'
    
    // Obtenemos la configuración del sitio
    const { data: siteSettings } = await supabase
      .from('site_settings')
      .select('*')
      .single()
    
    // URL del logo
    const logoUrl = siteSettings?.logo_url || '/logo.png'
    const absoluteLogoUrl = logoUrl.startsWith('http') 
      ? logoUrl 
      : `https://eurosim.click${logoUrl}`

    // Obtener plantilla específica para el tipo de producto
    const { data: emailTemplate } = await supabase
      .from('email_templates')
      .select('*')
      .eq('type', order.type)
      .eq('status', 'processing')
      .eq('is_active', true)
      .maybeSingle()

    // Si encontramos una plantilla, usarla; de lo contrario, crear una plantilla predeterminada
    if (emailTemplate && emailTemplate.content) {
      let processedHtml = emailTemplate.content
      
      // Reemplazar variables en la plantilla
      const variables = {
        nombre_cliente: customer.name,
        numero_pedido: order.id,
        total: formattedAmount,
        moneda: 'MXN',
        fecha_pedido: new Date().toLocaleDateString('es-MX'),
        producto: product.title,
        tipo_producto: isESim ? 'E-SIM' : 'SIM Física'
      }
      
      Object.entries(variables).forEach(([key, value]) => {
        const regex = new RegExp(`{${key}}`, 'g')
        processedHtml = processedHtml.replace(regex, String(value))
      })
      
      return processedHtml
    }
    
    // Plantilla predeterminada si no se encuentra una en la base de datos
    return `
      <html>
      <head>
        <title>Confirmación de Compra - EuroSim</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .header img { max-width: 200px; }
          h1 { color: #2563eb; margin-top: 0; }
          .order-details { margin: 20px 0; padding: 15px; background-color: #f9fafb; border-radius: 8px; }
          .footer { margin-top: 30px; text-align: center; font-size: 14px; color: #6b7280; }
          .button { display: inline-block; background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="${absoluteLogoUrl}" alt="EuroSim Logo">
            <h1>¡Gracias por tu compra!</h1>
          </div>
          
          <p>Hola ${customer.name},</p>
          
          <p>Hemos recibido tu pedido correctamente. A continuación encontrarás los detalles de tu compra:</p>
          
          <div class="order-details">
            <p><strong>Número de pedido:</strong> ${order.id}</p>
            <p><strong>Producto:</strong> ${product.title}</p>
            <p><strong>Tipo:</strong> ${isESim ? 'E-SIM' : 'SIM Física'}</p>
            <p><strong>Total:</strong> ${formattedAmount} MXN</p>
            <p><strong>Fecha:</strong> ${new Date().toLocaleDateString('es-MX')}</p>
          </div>

          <p>Tu compra ha sido procesada correctamente.</p>
          
          ${isESim ? 
            `<p style="color: #1a1f2c; font-size: 16px; font-weight: bold; background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
              Recuerda que recibirás tu código QR de activación vía email un día antes de tu fecha de activación además de las instrucciones simples para activar tus datos.
            </p>` : 
            `<p>Tu SIM está procesando, pronto te enviaremos un email con la información de envío.</p>`
          }
          
          <p style="color: #1a1f2c; font-size: 16px; font-weight: bold; background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
            A partir de esta fecha comenzarán a contar los 30 días de Vigencia en tus datos asignados, podrás siempre recargar durante la vigencia.
          </p>
          
          <p>Para cualquier duda o consulta, no dudes en contactarnos.</p>
          
          <p>¡Gracias por confiar en EuroSim!</p>
          
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} EuroSim. Todos los derechos reservados.</p>
          </div>
        </div>
      </body>
      </html>
    `
  } catch (error) {
    console.error('Error al generar el email de confirmación:', error)
    // Devolver una plantilla básica en caso de error
    return `<html><body><h1>Gracias por tu compra</h1><p>Tu pedido ha sido procesado correctamente.</p></body></html>`
  }
}
