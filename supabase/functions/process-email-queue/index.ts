import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { EmailProcessor } from "./emailProcessor.ts";
import { EmailQueueItem } from "./types.ts";

const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    console.log('🔄 Iniciando procesamiento de cola de emails');
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
    const processor = new EmailProcessor();

    // Obtener emails pendientes que deben ser procesados
    const { data: pendingEmails, error: queueError } = await supabase
      .from('email_queue')
      .select('*')
      .eq('status', 'pending')
      .order('priority', { ascending: false })
      .order('created_at', { ascending: true })
      .limit(10);

    if (queueError) {
      throw queueError;
    }

    console.log(`📬 Encontrados ${pendingEmails?.length || 0} emails pendientes`);

    if (!pendingEmails || pendingEmails.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No hay emails pendientes' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Procesar cada email que cumpla con los criterios de tiempo
    const results = await Promise.all(
      pendingEmails.map(async (email: EmailQueueItem) => {
        const shouldProcess = await supabase.rpc('should_process_email', {
          priority: email.priority,
          created_at: email.created_at,
          retry_count: email.retry_count,
          backoff_interval: email.backoff_interval
        });

        if (shouldProcess) {
          await processor.processQueueItem(email);
          return { id: email.id, processed: true };
        }

        return { id: email.id, processed: false, reason: 'No cumple criterios de tiempo' };
      })
    );

    return new Response(
      JSON.stringify({ processed: results }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('❌ Error general:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});