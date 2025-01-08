import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { EmailQueueItem, EmailTemplate, Customer, Order } from "./types.ts";

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

export class EmailProcessor {
  private supabase;

  constructor() {
    this.supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
  }

  async processQueueItem(email: EmailQueueItem) {
    try {
      // Marcar como procesando
      await this.updateQueueItemStatus(email.id, 'processing');

      // Obtener datos necesarios
      const [orderData, templateData, customerData] = await Promise.all([
        this.getOrderData(email.order_id),
        this.getTemplateData(email.template_id),
        this.getCustomerData(email.metadata.customer_id)
      ]);

      if (!orderData || !templateData || !customerData) {
        throw new Error('Datos necesarios no encontrados');
      }

      // Preparar y enviar el email
      const { subject, html } = this.prepareEmailContent(templateData, {
        order: orderData,
        customer: customerData
      });

      await this.sendEmail(customerData.email, subject, html);

      // Actualizar estado a enviado
      await this.updateQueueItemStatus(email.id, 'sent');
      console.log(`✅ Email enviado correctamente: ${email.id}`);

    } catch (error) {
      console.error(`❌ Error procesando email ${email.id}:`, error);
      await this.handleError(email, error);
    }
  }

  private async updateQueueItemStatus(id: string, status: string, error?: string) {
    const updates: any = { status };
    if (error) {
      updates.error = error;
      updates.retry_count = this.supabase.rpc('increment_retry_count', { queue_id: id });
    }
    
    await this.supabase
      .from('email_queue')
      .update(updates)
      .eq('id', id);
  }

  private async getOrderData(orderId: string): Promise<Order | null> {
    const { data } = await this.supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();
    return data;
  }

  private async getTemplateData(templateId: string | null): Promise<EmailTemplate | null> {
    if (!templateId) return null;
    const { data } = await this.supabase
      .from('email_templates')
      .select('*')
      .eq('id', templateId)
      .single();
    return data;
  }

  private async getCustomerData(customerId: string): Promise<Customer | null> {
    const { data } = await this.supabase
      .from('customers')
      .select('*')
      .eq('id', customerId)
      .single();
    return data;
  }

  private prepareEmailContent(template: EmailTemplate, data: { 
    order: Order, 
    customer: Customer 
  }) {
    let subject = template.subject;
    let html = template.content;

    // Reemplazar variables
    const variables = {
      order_id: data.order.id,
      customer_name: data.customer.name,
      order_status: data.order.status,
      // ... más variables según necesites
    };

    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      subject = subject.replace(regex, String(value));
      html = html.replace(regex, String(value));
    });

    return { subject, html };
  }

  private async sendEmail(to: string, subject: string, html: string) {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'EuroSim <noreply@eurosim.click>',
        to: [to],
        subject,
        html,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Error enviando email: ${error}`);
    }

    return await response.json();
  }

  private async handleError(email: EmailQueueItem, error: any) {
    await this.updateQueueItemStatus(email.id, 'failed', error.message);
    
    // Registrar el error en order_events
    await this.supabase
      .from('order_events')
      .insert({
        order_id: email.order_id,
        type: 'email_error',
        description: `Error enviando email: ${error.message}`,
        metadata: {
          email_queue_id: email.id,
          error: error.message
        }
      });
  }
}