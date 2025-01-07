import { supabase } from "@/integrations/supabase/client"
import { EmailTemplate } from "../types"

const createEmailTemplate = async (template: Omit<EmailTemplate, 'id' | 'created_at' | 'updated_at'>) => {
  const { error } = await supabase
    .from('email_templates')
    .insert(template)

  if (error) throw error
}

export const createDefaultTemplates = async () => {
  const { data: settings } = await supabase
    .from('site_settings')
    .select('logo_url')
    .single()

  const logoUrl = settings?.logo_url || "/logo.png"

  const baseTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { 
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          text-align: center;
          padding: 20px 0;
        }
        .logo {
          max-width: 200px;
          height: auto;
        }
        .content {
          background: #ffffff;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .footer {
          text-align: center;
          padding: 20px;
          font-size: 12px;
          color: #666;
        }
        .button {
          display: inline-block;
          padding: 12px 24px;
          background-color: #E02653;
          color: white;
          text-decoration: none;
          border-radius: 4px;
          margin: 20px 0;
        }
        .tracking-info {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 4px;
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="${logoUrl}" alt="Logo" class="logo">
        </div>
        <div class="content">
          {{content}}
        </div>
        <div class="footer">
          © ${new Date().getFullYear()} Euro Connect. Todos los derechos reservados.
        </div>
      </div>
    </body>
    </html>
  `

  const templates: Array<Omit<EmailTemplate, 'id' | 'created_at' | 'updated_at'>> = [
    {
      name: "Pago Pendiente",
      subject: "Completa tu pago para finalizar tu pedido",
      description: "Email enviado cuando el pago está pendiente",
      type: "both",
      status: "payment_pending",
      content: baseTemplate.replace("{{content}}", `
        <h2>¡Gracias por tu pedido!</h2>
        <p>Hola {nombre_cliente},</p>
        <p>Hemos recibido tu pedido #{numero_pedido}. Para completar tu compra, por favor realiza el pago:</p>
        <p><strong>Total a pagar:</strong> {total} {moneda}</p>
        <a href="{url_pago}" class="button">Completar Pago</a>
        <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
      `),
      variables: ["nombre_cliente", "numero_pedido", "total", "moneda", "url_pago"],
      is_active: true,
      cc_emails: []
    },
    {
      name: "Pago Confirmado",
      subject: "¡Pago confirmado! Tu pedido está en proceso",
      description: "Email enviado cuando se confirma el pago",
      type: "both",
      status: "processing",
      content: baseTemplate.replace("{{content}}", `
        <h2>¡Pago Confirmado!</h2>
        <p>Hola {nombre_cliente},</p>
        <p>Hemos recibido tu pago por el pedido #{numero_pedido}. Estamos procesando tu pedido:</p>
        <ul>
          <li>Número de pedido: {numero_pedido}</li>
          <li>Total pagado: {total} {moneda}</li>
          <li>Fecha de pedido: {fecha_pedido}</li>
        </ul>
        <p>Te mantendremos informado sobre el estado de tu pedido.</p>
      `),
      variables: ["nombre_cliente", "numero_pedido", "total", "moneda", "fecha_pedido"],
      is_active: true,
      cc_emails: []
    },
    {
      name: "Pedido Enviado (SIM Física)",
      subject: "Tu SIM está en camino",
      description: "Email enviado cuando se envía una SIM física",
      type: "physical",
      status: "shipped",
      content: baseTemplate.replace("{{content}}", `
        <h2>¡Tu SIM está en camino!</h2>
        <p>Hola {nombre_cliente},</p>
        <p>¡Buenas noticias! Tu SIM física del pedido #{numero_pedido} ha sido enviada.</p>
        <div class="tracking-info">
          <p><strong>Información de envío:</strong></p>
          <ul>
            <li>Número de seguimiento: {numero_tracking}</li>
            <li>Empresa de envío: {empresa_envio}</li>
            <li>Dirección de entrega: {direccion_envio}</li>
            <li>Fecha estimada de entrega: {fecha_estimada}</li>
          </ul>
        </div>
        <a href="{url_tracking}" class="button">Seguir Envío</a>
      `),
      variables: ["nombre_cliente", "numero_pedido", "numero_tracking", "empresa_envio", "direccion_envio", "fecha_estimada", "url_tracking"],
      is_active: true,
      cc_emails: []
    },
    {
      name: "E-SIM Activada",
      subject: "Tu E-SIM está lista para usar",
      description: "Email enviado cuando se activa una E-SIM",
      type: "esim",
      status: "delivered",
      content: baseTemplate.replace("{{content}}", `
        <h2>¡Tu E-SIM está lista!</h2>
        <p>Hola {nombre_cliente},</p>
        <p>Tu E-SIM del pedido #{numero_pedido} está lista para ser activada.</p>
        <div class="tracking-info">
          <p><strong>Información de activación:</strong></p>
          <ul>
            <li>Código de activación: {codigo_activacion}</li>
            <li>Fecha de activación: {fecha_activacion}</li>
          </ul>
        </div>
        <p>Instrucciones de activación:</p>
        <p>{instrucciones_activacion}</p>
        <img src="{qr_code}" alt="QR Code" style="max-width: 200px; margin: 20px auto; display: block;">
      `),
      variables: ["nombre_cliente", "numero_pedido", "codigo_activacion", "fecha_activacion", "instrucciones_activacion", "qr_code"],
      is_active: true,
      cc_emails: []
    },
    {
      name: "Pedido Cancelado",
      subject: "Tu pedido ha sido cancelado",
      description: "Email enviado cuando se cancela un pedido",
      type: "both",
      status: "cancelled",
      content: baseTemplate.replace("{{content}}", `
        <h2>Pedido Cancelado</h2>
        <p>Hola {nombre_cliente},</p>
        <p>Tu pedido #{numero_pedido} ha sido cancelado.</p>
        <p>Si realizaste algún pago, el reembolso se procesará en los próximos días hábiles.</p>
        <p>Si tienes alguna pregunta sobre la cancelación, no dudes en contactarnos.</p>
      `),
      variables: ["nombre_cliente", "numero_pedido"],
      is_active: true,
      cc_emails: []
    },
    {
      name: "Pago Fallido",
      subject: "Hubo un problema con tu pago",
      description: "Email enviado cuando falla un pago",
      type: "both",
      status: "payment_failed",
      content: baseTemplate.replace("{{content}}", `
        <h2>Problema con el Pago</h2>
        <p>Hola {nombre_cliente},</p>
        <p>Hubo un problema al procesar el pago de tu pedido #{numero_pedido}.</p>
        <p>Por favor, intenta realizar el pago nuevamente:</p>
        <a href="{url_pago}" class="button">Reintentar Pago</a>
        <p>Si continúas teniendo problemas, no dudes en contactarnos.</p>
      `),
      variables: ["nombre_cliente", "numero_pedido", "url_pago"],
      is_active: true,
      cc_emails: []
    }
  ]

  for (const template of templates) {
    await createEmailTemplate(template)
  }
}