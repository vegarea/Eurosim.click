
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.1"

// Set up Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseKey);

// Define CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Handle OPTIONS requests for CORS
function handleCors(req: Request) {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }
  return null;
}

async function handleWebhook(req: Request) {
  try {
    // Parse webhook payload
    const payload = await req.json();
    console.log("Received webhook payload:", payload);

    // Basic validation
    if (!payload.event || !payload.meta) {
      return new Response(
        JSON.stringify({ error: "Invalid webhook payload structure" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Process based on event type
    switch (payload.event) {
      case "low_data_notification":
        await processLowDataNotification(payload);
        break;
      case "expiration_notification":
        await processExpirationNotification(payload);
        break;
      case "order_activated":
        await processOrderActivation(payload);
        break;
      default:
        console.log(`Unknown event type: ${payload.event}`);
    }

    // Log webhook event
    await logWebhookEvent(payload);

    return new Response(
      JSON.stringify({ success: true, message: "Webhook processed successfully" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
}

async function processLowDataNotification(payload: any) {
  console.log("Processing low data notification");
  const { esim, type } = payload;
  
  if (!esim || !esim.iccid) {
    console.error("Missing eSIM data in payload");
    return;
  }
  
  // Find relevant order by ICCID
  const { data: orderData, error: orderError } = await supabase
    .from("airalo_orders")
    .select("id, order_id, customer_id")
    .eq("activation_code", esim.iccid)
    .maybeSingle();
    
  if (orderError || !orderData) {
    console.error("Error finding order for ICCID:", esim.iccid, orderError);
    return;
  }
  
  // Create an order event for the low data notification
  const eventData = {
    order_id: orderData.order_id,
    type: "airalo_notification",
    description: `eSIM data usage alert: ${type}`,
    metadata: {
      notification_type: "low_data",
      level: type,
      iccid: esim.iccid,
      data_remaining: esim.package?.data?.remaining,
      data_percentage: esim.package?.data?.percentage,
      webhook_id: payload.meta?.webhook_id
    }
  };
  
  const { error: eventError } = await supabase
    .from("order_events")
    .insert(eventData);
    
  if (eventError) {
    console.error("Error creating order event:", eventError);
  }
  
  // Todo: Send notification to customer
  // This would typically involve looking up the customer and sending an email/SMS
}

async function processExpirationNotification(payload: any) {
  console.log("Processing expiration notification");
  const { esim, type } = payload;
  
  if (!esim || !esim.iccid) {
    console.error("Missing eSIM data in payload");
    return;
  }
  
  // Find relevant order by ICCID
  const { data: orderData, error: orderError } = await supabase
    .from("airalo_orders")
    .select("id, order_id, customer_id")
    .eq("activation_code", esim.iccid)
    .maybeSingle();
    
  if (orderError || !orderData) {
    console.error("Error finding order for ICCID:", esim.iccid, orderError);
    return;
  }
  
  // Create an order event for the expiration notification
  const eventData = {
    order_id: orderData.order_id,
    type: "airalo_notification",
    description: `eSIM expiration alert: ${type}`,
    metadata: {
      notification_type: "expiration",
      level: type,
      iccid: esim.iccid,
      days_remaining: esim.package?.validity?.remaining_days,
      expires_at: esim.package?.validity?.expired_at,
      webhook_id: payload.meta?.webhook_id
    }
  };
  
  const { error: eventError } = await supabase
    .from("order_events")
    .insert(eventData);
    
  if (eventError) {
    console.error("Error creating order event:", eventError);
  }
  
  // Todo: Send notification to customer
}

async function processOrderActivation(payload: any) {
  console.log("Processing order activation");
  // Implement logic to handle order activation events
  // Update order status, create events, etc.
}

async function logWebhookEvent(payload: any) {
  try {
    // Store the full webhook payload for debugging purposes
    const { error } = await supabase
      .from("airalo_webhook_logs")
      .insert({
        event_type: payload.event,
        payload: payload,
        received_at: new Date().toISOString()
      });
      
    if (error) {
      console.error("Error logging webhook:", error);
    }
  } catch (err) {
    console.error("Failed to log webhook event:", err);
  }
}

serve(async (req) => {
  // Handle CORS preflight request
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;
  
  // Process the webhook
  return await handleWebhook(req);
});
