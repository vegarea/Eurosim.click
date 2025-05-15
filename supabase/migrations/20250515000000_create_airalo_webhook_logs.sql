
-- Create table to store Airalo webhook logs
CREATE TABLE IF NOT EXISTS public.airalo_webhook_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  payload JSONB NOT NULL,
  received_at TIMESTAMP WITH TIME ZONE NOT NULL,
  processed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  is_processed BOOLEAN DEFAULT true,
  notes TEXT
);

-- Add webhook_url column to airalo_settings if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'airalo_settings'
    AND column_name = 'webhook_url'
  ) THEN
    ALTER TABLE public.airalo_settings
    ADD COLUMN webhook_url TEXT;
  END IF;
END
$$;

-- Add RLS policies
ALTER TABLE public.airalo_webhook_logs ENABLE ROW LEVEL SECURITY;

-- Allow admins to view webhook logs
CREATE POLICY "Allow admins to view webhook logs"
ON public.airalo_webhook_logs
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);
