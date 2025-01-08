import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'
import Stripe from 'https://esm.sh/stripe@14.21.0'
import { handleCustomerCreation } from './handlers/customerHandler.ts'
import { handleOrderCreation } from './handlers/orderHandler.ts'
import { handleOrderItemCreation } from './handlers/orderItemHandler.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      headers: corsHeaders,
      status: 200 
    })
  }

  try {
    console.log('🎯 Webhook request received')

    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY')
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    if (!stripeSecretKey || !webhookSecret || !supabaseUrl || !supabaseServiceKey) {
      console.error('❌ Missing required environment variables')
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }), 
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    })

    const signature = req.headers.get('stripe-signature')
    if (!signature) {
      console.error('❌ No Stripe signature found')
      return new Response(
        JSON.stringify({ error: 'No Stripe signature found' }), 
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const bodyArray = await req.arrayBuffer()
    const body = new TextDecoder().decode(bodyArray)
    
    let event
    try {
      event = await stripe.webhooks.constructEventAsync(
        body,
        signature,
        webhookSecret,
        undefined,
        Stripe.createSubtleCryptoProvider()
      )
    } catch (err) {
      console.error('❌ Error verifying webhook signature:', err)
      return new Response(
        JSON.stringify({ error: 'Webhook signature verification failed' }), 
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    console.log('✅ Processing event type:', event.type)

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      console.log('📦 Processing completed checkout session:', session.id)

      try {
        const customer = await handleCustomerCreation(session, supabase)
        console.log('👤 Customer processed:', customer)

        const order = await handleOrderCreation(session, customer, supabase)
        console.log('📝 Order created:', order)

        const orderItems = await handleOrderItemCreation(session, order, supabase)
        console.log('🛍️ Order items created:', orderItems)

        // Enviar email de confirmación directamente usando Resend
        if (customer?.email) {
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
            })

            if (!emailResponse.ok) {
              console.error('❌ Error sending confirmation email:', await emailResponse.text())
            } else {
              console.log('✉️ Confirmation email sent successfully')
            }
          } catch (emailError) {
            console.error('❌ Error in email sending:', emailError)
          }
        }

        // Registrar el evento de pago completado
        const paymentEvent = {
          order_id: order.id,
          type: 'payment_processed',
          description: 'Pago completado exitosamente',
          metadata: {
            payment_intent: session.payment_intent,
            payment_status: session.payment_status,
            amount: session.amount_total
          }
        }

        const { error: eventError } = await supabase
          .from('order_events')
          .insert(paymentEvent)

        if (eventError) {
          console.error('❌ Error creating payment event:', eventError)
        }

        return new Response(
          JSON.stringify({ received: true, order_id: order.id }), 
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200 
          }
        )
      } catch (error) {
        console.error('❌ Error processing webhook:', error)
        return new Response(
          JSON.stringify({ 
            received: true, 
            error: error.message,
            warning: 'Processed with errors' 
          }), 
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200 
          }
        )
      }
    }

    return new Response(
      JSON.stringify({ received: true }), 
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('❌ Fatal error processing webhook:', error)
    return new Response(
      JSON.stringify({ 
        received: true, 
        error: error.message,
        warning: 'Fatal error occurred' 
      }), 
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})