import { supabase } from "@/integrations/supabase/client"
import { baseTemplate } from "./emailTemplateStyles"
import {
  paymentPendingContent,
  processingContent,
  shippedContent,
  esimDeliveredContent,
  cancelledContent,
  paymentFailedContent
} from "./templateContents"
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

  const templates: Array<Omit<EmailTemplate, 'id' | 'created_at' | 'updated_at'>> = [
    {
      name: "Pago Pendiente",
      subject: "Completa tu pago para finalizar tu pedido",
      description: "Email enviado cuando el pago está pendiente",
      type: "both",
      status: "payment_pending",
      content: baseTemplate(logoUrl, paymentPendingContent),
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
      content: baseTemplate(logoUrl, processingContent),
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
      content: baseTemplate(logoUrl, shippedContent),
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
      content: baseTemplate(logoUrl, esimDeliveredContent),
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
      content: baseTemplate(logoUrl, cancelledContent),
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
      content: baseTemplate(logoUrl, paymentFailedContent),
      variables: ["nombre_cliente", "numero_pedido", "url_pago"],
      is_active: true,
      cc_emails: []
    }
  ]

  for (const template of templates) {
    await createEmailTemplate(template)
  }
}