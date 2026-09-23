# notify-lead — notificación por correo de nuevos leads

Edge Function que se dispara con un **Database Webhook** en cada `INSERT` a la
tabla `leads` y envía un correo con los datos del lead usando **Resend**.

- **Remitente:** configurable vía `LEAD_NOTIFY_FROM` (dominio verificado en Resend)
- **Destinatario:** configurable vía `LEAD_NOTIFY_TO`
- **Project ref:** `nhyhilbvpcttjllunxhm`

## Secretos (nunca hardcodear ni ponerlos en el `.env` del frontend)

| Secreto | Obligatorio | Descripción |
|---|---|---|
| `RESEND_API_KEY` | sí | API key de Resend |
| `LEAD_NOTIFY_FROM` | sí | Remitente del correo, p.ej. `ARDE Leads <leads@navesylotesindustriales.com>` (dominio verificado en Resend) |
| `LEAD_NOTIFY_TO` | sí | Destinatario de la notificación, p.ej. `propiedades@navesylotesindustriales.com` |
| `WEBHOOK_SECRET` | no | Si se define, exige el header `x-webhook-secret` con ese valor |

## Deploy (correr desde la raíz del repo)

```bash
# 1) CLI + autenticación (una sola vez)
brew install supabase/tap/supabase
supabase login

# 2) Enlazar el proyecto
supabase link --project-ref nhyhilbvpcttjllunxhm

# 3) Guardar el secreto SIN dejarlo en el historial del shell
printf 'RESEND_API_KEY=re_xxx\nLEAD_NOTIFY_FROM=ARDE Leads <leads@navesylotesindustriales.com>\nLEAD_NOTIFY_TO=propiedades@navesylotesindustriales.com\n' > /tmp/notify-lead.secret
supabase secrets set --env-file /tmp/notify-lead.secret --project-ref nhyhilbvpcttjllunxhm
rm /tmp/notify-lead.secret

# 4) Desplegar SIN verificación de JWT (el webhook de la BD no manda JWT de usuario)
supabase functions deploy notify-lead --no-verify-jwt --project-ref nhyhilbvpcttjllunxhm
```

Opcional (endurecer con secreto compartido):

```bash
supabase secrets set WEBHOOK_SECRET=$(openssl rand -hex 16) --project-ref nhyhilbvpcttjllunxhm
supabase secrets list --project-ref nhyhilbvpcttjllunxhm   # copia el valor para el header del webhook
```

## Configurar el Database Webhook

**Dashboard → Database → Webhooks → Create a new hook** (habilita webhooks si es la 1ª vez):

1. **Name:** `notify-lead-on-insert`
2. **Table:** `leads` (schema `public`)
3. **Events:** solo **`Insert`**
4. **Webhook type:** *Supabase Edge Functions* → función **`notify-lead`** · Method **POST**
5. **HTTP Headers:** conserva `Content-type: application/json`. Si usaste `WEBHOOK_SECRET`,
   añade `x-webhook-secret` con su valor.
6. **Create hook**

El webhook envía `POST { type, table, record, schema, old_record }`; la función lee `record`.

## Payload y campos

Campos que muestra el correo (leídos de `record`, con fallback):

| Campo del correo | Columna de `leads` | Nota |
|---|---|---|
| Nombre | `nombre` | |
| Teléfono | `telefono` | incluye enlace `wa.me` |
| Tipo de nave | `tipo_de_nave` | |
| Origen | `origen` | la landing **no** la escribe hoy → fallback `"landing"` |
| Fecha | `created_at` | formateada a hora de México |

## Probar

1. Envía el formulario de la landing (o inserta una fila en `leads`).
2. Revisa el correo en `bto2891@gmail.com`.
3. Logs: `supabase functions logs notify-lead --project-ref nhyhilbvpcttjllunxhm`
