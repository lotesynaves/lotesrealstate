// Supabase Edge Function: notify-lead
// -------------------------------------------------------------------------
// Se dispara desde un Database Webhook (INSERT en la tabla "leads") y envía
// un correo con los datos del lead usando Resend.
//
// Secretos (supabase secrets set) — NUNCA hardcodear ni poner en el .env del front:
//   RESEND_API_KEY   API key de Resend (obligatorio)
//   WEBHOOK_SECRET   opcional; si se define, se exige el header "x-webhook-secret"
//                    con ese mismo valor (endurece: evita que cualquiera invoque la fn)
//   LEAD_NOTIFY_FROM remitente del correo (obligatorio), p.ej. "ARDE Leads <leads@navesylotesindustriales.com>"
//   LEAD_NOTIFY_TO   destinatario del correo (obligatorio), p.ej. "propiedades@navesylotesindustriales.com"
//
// Deploy sin verificación de JWT (el webhook de la BD no manda un JWT de usuario):
//   supabase functions deploy notify-lead --no-verify-jwt

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const WEBHOOK_SECRET = Deno.env.get("WEBHOOK_SECRET"); // opcional

const FROM = Deno.env.get("LEAD_NOTIFY_FROM");
const TO = Deno.env.get("LEAD_NOTIFY_TO");

/** Escapa texto para incrustarlo en HTML sin romper el markup. */
function esc(v: unknown): string {
  return String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Formatea la fecha del lead a hora de México en español. */
function fmtFecha(v: unknown): string {
  const d = v ? new Date(String(v)) : new Date();
  const safe = isNaN(d.getTime()) ? new Date() : d;
  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "America/Mexico_City",
  }).format(safe);
}

/** Deja solo dígitos para armar un enlace wa.me. */
function waLink(tel: unknown): string {
  const digits = String(tel ?? "").replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : "";
}

Deno.serve(async (req) => {
  try {
    if (req.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    // Verificación opcional por secreto compartido (solo si WEBHOOK_SECRET existe).
    if (WEBHOOK_SECRET && req.headers.get("x-webhook-secret") !== WEBHOOK_SECRET) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (!RESEND_API_KEY) {
      console.error("Falta el secreto RESEND_API_KEY");
      return new Response("Missing RESEND_API_KEY", { status: 500 });
    }

    if (!FROM || !TO) {
      console.error(
        "Faltan variables de entorno: LEAD_NOTIFY_FROM y/o LEAD_NOTIFY_TO",
        { hasFrom: Boolean(FROM), hasTo: Boolean(TO) },
      );
      return new Response("Missing LEAD_NOTIFY_FROM/LEAD_NOTIFY_TO", { status: 500 });
    }

    // Payload del Database Webhook: { type, table, schema, record, old_record }
    const payload = await req.json().catch(() => ({} as Record<string, unknown>));
    const record = (payload.record ?? payload ?? {}) as Record<string, unknown>;

    const nombre = record.nombre ?? "—";
    const telefono = record.telefono ?? "—";
    const tipo = record.tipo_de_nave ?? "—";
    // La landing hoy no escribe "origen"; si la columna no existe, cae al nombre de la tabla.
    const origen = record.origen ?? payload.table ?? "landing";
    const fecha = fmtFecha(record.created_at ?? record.fecha);
    const wa = waLink(telefono);

    const subject = `Nuevo lead: ${nombre} — ${tipo}`;

    const row = (label: string, value: string) => `
      <tr>
        <td style="padding:8px 12px;color:#6b7280;font:600 13px system-ui,sans-serif;white-space:nowrap;vertical-align:top;">${label}</td>
        <td style="padding:8px 12px;color:#111827;font:14px system-ui,sans-serif;">${value}</td>
      </tr>`;

    const html = `
      <div style="max-width:560px;margin:0 auto;font-family:system-ui,sans-serif;">
        <h2 style="color:#111827;font-size:18px;margin:0 0 4px;">Nuevo lead recibido</h2>
        <p style="color:#6b7280;font-size:13px;margin:0 0 16px;">Formulario de la landing (naves Querétaro)</p>
        <table style="border-collapse:collapse;width:100%;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
          ${row("Nombre", esc(nombre))}
          ${row("Teléfono", `${esc(telefono)}${wa ? ` &nbsp;·&nbsp; <a href="${esc(wa)}" style="color:#25D366;text-decoration:none;">WhatsApp →</a>` : ""}`)}
          ${row("Tipo de nave", esc(tipo))}
          ${row("Origen", esc(origen))}
          ${row("Fecha", esc(fecha))}
        </table>
      </div>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from: FROM, to: TO, subject, html }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Resend error", res.status, errText);
      return new Response(`Resend error: ${res.status} ${errText}`, { status: 502 });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("notify-lead error", err);
    return new Response("Internal error", { status: 500 });
  }
});
