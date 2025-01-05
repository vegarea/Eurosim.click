-- Create pending_orders table
create table pending_orders (
  id uuid primary key default gen_random_uuid(),
  shipping_address jsonb not null,
  customer_info jsonb not null,
  order_info jsonb not null,
  expires_at timestamp with time zone not null,
  created_at timestamp with time zone default now() not null
);

-- Create index on expires_at for cleanup operations
create index idx_pending_orders_expires_at on pending_orders(expires_at);

-- Enable RLS
alter table pending_orders enable row level security;

-- Create policy to allow inserts without authentication (for guest checkout)
create policy "Enable insert for anonymous users"
on pending_orders for insert
to anon
with check (true);

-- Create policy to allow select only with matching ID
create policy "Enable select for matching ID"
on pending_orders for select
to anon
using (true);

-- Create function to clean up expired orders
create or replace function cleanup_expired_pending_orders()
returns void
language plpgsql
security definer
as $$
begin
  delete from pending_orders
  where expires_at < now();
end;
$$;

-- Create cron job to run cleanup every hour
select cron.schedule(
  'cleanup-pending-orders',
  '0 * * * *', -- Every hour
  $$
    select cleanup_expired_pending_orders();
  $$
);