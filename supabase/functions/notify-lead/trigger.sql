-- ============================================================================
-- Notificación de leads: trigger que llama a la Edge Function notify-lead
-- en cada INSERT a public.leads, usando pg_net (net.http_post).
-- Requiere la extensión pg_net activada (Database → Extensions).
-- Referencia versionada de los objetos ya aplicados en producción.
-- ============================================================================

-- Función de trigger
create or replace function public.notify_lead_on_insert()
returns trigger
language plpgsql
security definer
as $$
begin
  perform net.http_post(
    url     := 'https://nhyhilbvpcttjllunxhm.supabase.co/functions/v1/notify-lead',
    headers := jsonb_build_object(
      'Content-Type', 'application/json'
      -- Si se configura WEBHOOK_SECRET en la función, descomentar y poner el
      -- mismo valor (dejar la coma inicial):
      -- , 'x-webhook-secret', 'EL_VALOR_DE_WEBHOOK_SECRET'
      -- Si diera 401, añadir la anon key (es pública):
      -- , 'Authorization', 'Bearer TU_ANON_KEY'
    ),
    body := jsonb_build_object(
      'type',   'INSERT',
      'table',  TG_TABLE_NAME,
      'schema', TG_TABLE_SCHEMA,
      'record', to_jsonb(NEW)
    )
  );
  return NEW;
end;
$$;

-- Trigger sobre la tabla leads (idempotente: re-ejecutable sin duplicar)
drop trigger if exists trg_notify_lead_on_insert on public.leads;

create trigger trg_notify_lead_on_insert
  after insert on public.leads
  for each row
  execute function public.notify_lead_on_insert();
