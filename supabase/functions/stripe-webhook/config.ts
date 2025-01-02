export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
  'Content-Type': 'application/json'
}

export const requiredEnvVars = {
  STRIPE_SECRET_KEY: Deno.env.get('STRIPE_SECRET_KEY'),
  STRIPE_WEBHOOK_SECRET: Deno.env.get('STRIPE_WEBHOOK_SECRET'),
  SUPABASE_URL: Deno.env.get('SUPABASE_URL'),
  SUPABASE_SERVICE_ROLE_KEY: Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
}

export function validateEnvVars(logger: any) {
  for (const [key, value] of Object.entries(requiredEnvVars)) {
    if (!value) {
      logger.error(`Missing required environment variable: ${key}`);
      throw new Error(`${key} is required`);
    }
    
    if (key === 'STRIPE_WEBHOOK_SECRET' && !value.startsWith('whsec_')) {
      logger.error('Invalid Stripe webhook secret format', {
        secretStart: value.substring(0, 5),
        expectedStart: 'whsec_'
      });
      throw new Error('Invalid Stripe webhook secret format');
    }
    
    if (key === 'STRIPE_SECRET_KEY' && !value.startsWith('sk_')) {
      logger.error('Invalid Stripe secret key format');
      throw new Error('Invalid Stripe secret key format');
    }
  }
  logger.success('All required environment variables are present and valid');
}