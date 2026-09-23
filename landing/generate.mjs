// ============================================================================
//  GENERADOR DE LA LANDING ESTÁTICA
// ----------------------------------------------------------------------------
//  Lee landing.config.mjs y emite un HTML 100% estático (contenido horneado,
//  sin React ni bundle) en client/public/<outDir>/index.html.
//  Vite copia client/public/** verbatim a dist/public/** en el build.
//
//  Uso:  node landing/generate.mjs
// ============================================================================

import { config as c } from "./landing.config.mjs";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Escape para texto que va a HTML
const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const waHref = `https://wa.me/${c.contact.whatsappNumber}?text=${encodeURIComponent(
  c.contact.whatsappMessage,
)}`;
const telHref = `tel:+52${c.contact.phoneRaw}`;

// Endpoint REST de Supabase para insertar leads. La anon key es pública por
// diseño (protegida por RLS: solo INSERT, sin SELECT). Si no hay config de
// Supabase, no se emite el bloque de insert y la landing sigue igual.
const sb = c.supabase || {};
const sbTable = sb.table || "leads";
const sbEndpoint = sb.url
  ? `${sb.url.replace(/\/+$/, "")}/rest/v1/${sbTable}`
  : "";

// Bloque JS (fire-and-forget) que guarda el lead en Supabase además de Netlify.
// Se ejecuta en paralelo: un fallo aquí NO bloquea el envío a Netlify ni el
// mensaje de éxito. Usa Prefer: return=minimal para no requerir política SELECT.
const supabaseInsertJs = sbEndpoint
  ? `
          // Guardar el lead también en Supabase (tabla "${sbTable}").
          try {
            var sbData = new FormData(form);
            fetch(${JSON.stringify(sbEndpoint)}, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'apikey': ${JSON.stringify(sb.anonKey || "")},
                'Authorization': 'Bearer ' + ${JSON.stringify(sb.anonKey || "")},
                'Prefer': 'return=minimal'
              },
              body: JSON.stringify({
                nombre: sbData.get('nombre') || '',
                telefono: sbData.get('telefono') || '',
                tipo_de_nave: sbData.get('tipo_de_nave') || ''
              })
            }).catch(function (err) { console.error('Supabase lead insert failed', err); });
          } catch (err) { console.error('Supabase lead insert error', err); }
`
  : "";

// Icono WhatsApp reutilizable
const waIcon = `<svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.2 1.6 6L4 29l8.2-1.6c1.8.9 3.7 1.4 5.8 1.4 6.6 0 12-5.4 12-12S22.6 3 16 3zm0 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-4.9 1 1-4.8-.3-.4c-1-1.6-1.5-3.4-1.5-5.3 0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10.1-9.9 10.1zm5.5-7.4c-.3-.2-1.8-.9-2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1c-1.8-.9-3-1.6-4.2-3.6-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5s-.7-1.6-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.2 4.6 2.9 1.2 2.9.8 3.5.8.5 0 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.2-.6-.4z"/></svg>`;

const specChips = c.hero.specs
  .map((s) => `<li class="chip">${esc(s)}</li>`)
  .join("\n            ");

const typeOptions = c.form.typeOptions
  .map((o) => `<option value="${esc(o)}">${esc(o)}</option>`)
  .join("\n                ");

const trustStats = c.trust.stats
  .map(
    (s) => `<div class="stat">
              <span class="stat-value">${esc(s.value)}</span>
              <span class="stat-label">${esc(s.label)}</span>
            </div>`,
  )
  .join("\n            ");

const trustPoints = c.trust.points
  .map((p) => `<li>${esc(p)}</li>`)
  .join("\n            ");

const zoneChips = c.zones
  .map((z) => `<li class="zone">${esc(z)}</li>`)
  .join("\n            ");

const html = `<!DOCTYPE html>
<html lang="${esc(c.lang)}">
  <head>
    <!-- Google Tag Manager (mismo contenedor del sitio, una sola vez) -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${c.gtmId}');</script>
    <!-- End Google Tag Manager -->
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${esc(c.title)}</title>
    <meta name="description" content="${esc(c.metaDescription)}" />
    <meta name="robots" content="index, follow" />
    <link rel="preload" as="image" href="${esc(c.hero.image)}" fetchpriority="high" />
    <link rel="icon" href="/lp-naves-queretaro/favicon.ico" sizes="any" />
    <link rel="icon" type="image/png" sizes="32x32" href="/lp-naves-queretaro/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/lp-naves-queretaro/favicon-16x16.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/lp-naves-queretaro/apple-touch-icon.png" />
    <meta name="theme-color" content="#1f6fd6" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
    <style>
      :root {
        /* Tokens calcados de client/src/index.css */
        --primary: 217 71% 45%;
        --primary-fg: 210 20% 98%;
        --foreground: 222 47% 11%;
        --muted-foreground: 215 16% 47%;
        --border: 214 32% 91%;
        --card: 210 20% 98%;
        --card-border: 214 20% 93%;
        --whatsapp: #0C8040;
        --whatsapp-hover: #0A6E37;
        --radius: 0.5rem;
        --shadow-sm: 0px 2px 4px -1px hsl(222 47% 11% / 0.06), 0px 1px 2px -1px hsl(222 47% 11% / 0.06);
        --shadow-md: 0px 6px 12px -2px hsl(222 47% 11% / 0.1), 0px 3px 6px -2px hsl(222 47% 11% / 0.08);
        --shadow-lg: 0px 10px 20px -4px hsl(222 47% 11% / 0.12), 0px 4px 8px -2px hsl(222 47% 11% / 0.08);
        --shadow-xl: 0px 20px 25px -5px hsl(222 47% 11% / 0.15), 0px 8px 10px -5px hsl(222 47% 11% / 0.1);
        --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      }
      * { box-sizing: border-box; }
      html { -webkit-text-size-adjust: 100%; scroll-behavior: smooth; }
      body {
        margin: 0;
        font-family: var(--font-sans);
        color: hsl(var(--foreground));
        line-height: 1.55;
        background: #fff;
      }
      a { color: inherit; }
      img { max-width: 100%; display: block; }
      .wrap { width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 24px; }

      /* ---- Header ---- */
      .site-header {
        position: sticky; top: 0; z-index: 30;
        background: rgba(255,255,255,0.9); backdrop-filter: saturate(180%) blur(8px);
        border-bottom: 1px solid hsl(var(--border));
      }
      .site-header .wrap {
        display: flex; align-items: center; justify-content: space-between;
        padding-top: 14px; padding-bottom: 14px; gap: 12px;
      }
      .brand { font-weight: 800; font-size: 22px; letter-spacing: -0.02em; color: hsl(var(--primary)); }
      .brand-logo { height: 40px; width: auto; display: block; }
      .header-phone {
        display: inline-flex; align-items: center; gap: 8px;
        font-weight: 700; text-decoration: none; font-size: 15px; color: hsl(var(--foreground));
        white-space: nowrap; padding: 8px 14px; border-radius: var(--radius);
        border: 1px solid hsl(var(--border)); box-shadow: var(--shadow-sm); background: #fff;
      }
      .header-phone span { color: hsl(var(--muted-foreground)); font-weight: 500; }

      /* ---- Botones (calcan Button del sitio) ---- */
      .btn {
        display: inline-flex; align-items: center; justify-content: center; gap: 10px;
        font-family: inherit; font-weight: 600; font-size: 18px; line-height: 1;
        min-height: 52px; padding: 0 32px; border-radius: var(--radius);
        text-decoration: none; cursor: pointer; border: 1px solid transparent;
        transition: background-color .2s ease, box-shadow .2s ease, filter .2s ease;
      }
      .btn svg { width: 22px; height: 22px; }
      .btn-primary { background: hsl(var(--primary)); color: hsl(var(--primary-fg)); box-shadow: var(--shadow-md); }
      .btn-primary:hover { background: hsl(217 71% 40%); }
      .btn-wa { background: var(--whatsapp); color: #fff; box-shadow: var(--shadow-md); }
      .btn-wa:hover { background: var(--whatsapp-hover); }
      .btn-outline-light {
        background: rgba(255,255,255,0.1); color: #fff;
        border-color: rgba(255,255,255,0.25); backdrop-filter: blur(4px);
      }
      .btn-outline-light:hover { background: rgba(255,255,255,0.2); }

      /* ---- Hero full-bleed con imagen + overlay (como la home) ---- */
      .hero { position: relative; overflow: hidden; }
      .hero-bg { position: absolute; inset: 0; z-index: 0; }
      .hero-bg img { width: 100%; height: 100%; object-fit: cover; }
      .hero-overlay {
        position: absolute; inset: 0; z-index: 1;
        background: linear-gradient(to bottom, rgba(0,0,0,0.62), rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.72));
      }
      .hero-inner {
        position: relative; z-index: 2;
        display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 48px; align-items: center;
        padding-top: 72px; padding-bottom: 72px; min-height: 88vh;
      }
      .hero-copy { color: #fff; }
      .hero-zh {
        margin: 0 0 14px; font-size: 23.04px; font-weight: 600;
        letter-spacing: 0.22em; color: hsl(25 85% 62%);
        text-shadow: 0 1px 10px rgba(0,0,0,0.4);
        display: inline-flex; align-items: center; gap: 12px;
      }
      .hero-zh::before {
        content: ""; width: 26px; height: 2px; border-radius: 2px;
        background: hsl(25 85% 62%); display: inline-block;
      }
      .hero-copy h1 {
        font-size: clamp(34px, 5.4vw, 60px); line-height: 1.05; letter-spacing: -0.025em;
        font-weight: 800; margin: 0 0 20px; text-shadow: 0 2px 24px rgba(0,0,0,0.35);
      }
      .hero-copy .sub {
        font-size: clamp(17px, 1.7vw, 21px); color: rgba(255,255,255,0.92);
        margin: 0 0 26px; max-width: 52ch;
      }
      ul.chips { list-style: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; gap: 10px; }
      .chip {
        font-size: 14px; font-weight: 600; padding: 9px 16px; border-radius: 999px;
        background: rgba(255,255,255,0.12); color: #fff;
        border: 1px solid rgba(255,255,255,0.22); backdrop-filter: blur(4px);
      }
      .cta-row { display: flex; flex-wrap: wrap; gap: 14px; }

      /* ---- Form card flotante sobre el hero ---- */
      .form-card {
        background: #fff; border: 1px solid hsl(var(--card-border)); border-radius: 16px;
        padding: 28px; box-shadow: var(--shadow-xl);
      }
      .form-card h2 { font-size: 22px; margin: 0 0 6px; letter-spacing: -0.01em; }
      .form-card .form-sub { color: hsl(var(--muted-foreground)); font-size: 14px; margin: 0 0 20px; }
      .field { margin-bottom: 15px; }
      label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px; }
      input, select {
        width: 100%; font-family: inherit; font-size: 16px; padding: 13px 14px;
        border: 1px solid hsl(var(--border)); border-radius: var(--radius); background: #fff; color: inherit;
      }
      input:focus, select:focus { outline: none; border-color: hsl(var(--primary)); box-shadow: 0 0 0 3px hsl(var(--primary) / 0.18); }
      .form-card .btn { width: 100%; margin-top: 6px; }
      .disclaimer { font-size: 12px; color: hsl(var(--muted-foreground)); margin: 14px 0 0; text-align: center; }
      .form-success {
        display: none; background: hsl(var(--primary) / 0.06); border: 1px solid hsl(var(--primary) / 0.22);
        color: hsl(217 71% 36%); padding: 18px; border-radius: 12px; font-weight: 600;
      }

      /* ---- Secciones ---- */
      section.block { padding: 72px 0; }
      section.block.alt { background: hsl(var(--card)); border-top: 1px solid hsl(var(--border)); border-bottom: 1px solid hsl(var(--border)); }
      .section-head { text-align: center; margin: 0 auto 44px; max-width: 720px; }
      h2.section-title { font-size: clamp(26px, 3.4vw, 38px); font-weight: 800; letter-spacing: -0.025em; margin: 0; }
      .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 36px; }
      .stat { background: #fff; border: 1px solid hsl(var(--card-border)); border-radius: 14px; padding: 28px 20px; text-align: center; box-shadow: var(--shadow-sm); }
      .stat-value { display: block; font-size: 40px; font-weight: 800; color: hsl(var(--primary)); letter-spacing: -0.03em; line-height: 1.1; }
      .stat-label { display: block; font-size: 15px; color: hsl(var(--muted-foreground)); margin-top: 8px; }
      ul.points { margin: 0 auto; padding: 0; max-width: 820px; list-style: none; display: grid; gap: 14px; }
      ul.points li {
        position: relative; padding: 16px 18px 16px 52px; font-size: 16px; font-weight: 500;
        background: #fff; border: 1px solid hsl(var(--card-border)); border-radius: var(--radius); box-shadow: var(--shadow-sm);
      }
      ul.points li::before {
        content: ""; position: absolute; left: 16px; top: 50%; transform: translateY(-50%);
        width: 22px; height: 22px; border-radius: 999px; background: hsl(var(--primary) / 0.12);
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231f6fd6' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'/%3E%3C/svg%3E");
        background-size: 14px; background-position: center; background-repeat: no-repeat;
      }
      ul.zones { list-style: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; }
      .zone { font-size: 16px; font-weight: 600; padding: 11px 22px; border-radius: 999px; background: #fff; border: 1px solid hsl(var(--card-border)); box-shadow: var(--shadow-sm); }

      /* ---- CTA final ---- */
      .final-cta { text-align: center; }
      .final-cta .cta-row { justify-content: center; margin-top: 28px; }

      /* ---- Footer ---- */
      footer.site-footer { padding: 32px 0; border-top: 1px solid hsl(var(--border)); color: hsl(var(--muted-foreground)); font-size: 14px; }
      footer.site-footer .wrap { display: flex; flex-wrap: wrap; gap: 8px 20px; align-items: center; justify-content: space-between; }
      footer.site-footer a { text-decoration: none; font-weight: 700; color: hsl(var(--primary)); }

      /* ---- Botón flotante de WhatsApp (calca FloatingWhatsAppButton.tsx) ---- */
      .wa-float {
        position: fixed; bottom: 32px; right: 32px; z-index: 50;
        background: var(--whatsapp); color: #fff; border-radius: 999px;
        width: 64px; height: 64px; display: inline-flex; align-items: center; justify-content: center;
        box-shadow: var(--shadow-lg); text-decoration: none; border: none; cursor: pointer;
        transition: background-color .2s ease, box-shadow .2s ease;
      }
      .wa-float:hover { background: var(--whatsapp-hover); box-shadow: var(--shadow-xl); }
      .wa-float svg { width: 34px; height: 34px; }
      .wa-float .badge {
        position: absolute; top: -6px; right: -6px; background: #ef4444; color: #fff;
        font-size: 12px; font-weight: 700; border-radius: 999px; height: 24px; width: 24px;
        display: flex; align-items: center; justify-content: center;
      }

      /* ---- Responsive ---- */
      @media (max-width: 900px) {
        .hero-inner { grid-template-columns: 1fr; gap: 32px; min-height: auto; padding-top: 48px; padding-bottom: 48px; }
        .stats { grid-template-columns: 1fr; }
        section.block { padding: 52px 0; }
        .header-phone span { display: none; }
        .wa-float { bottom: 20px; right: 20px; }
      }
    </style>
  </head>
  <body>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${c.gtmId}"
      height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->

    <header class="site-header">
      <div class="wrap">
        ${
          c.logo && c.logo.src
            ? `<img class="brand-logo" src="${esc(c.logo.src)}" alt="${esc(c.logo.alt || c.brand)}" height="${c.logo.height}" />`
            : `<div class="brand">${esc(c.brand)}</div>`
        }
        <a class="header-phone" href="${telHref}" data-wa-tel>
          <span>Llámanos:</span> ${esc(c.contact.phoneDisplay)}
        </a>
      </div>
    </header>

    <main>
      <!-- HERO -->
      <section class="hero">
        <div class="hero-bg">
          <img src="${esc(c.hero.image)}" alt="${esc(c.hero.imageAlt)}" fetchpriority="high" width="1600" height="778" />
        </div>
        <div class="hero-overlay"></div>
        <div class="wrap hero-inner">
          <div class="hero-copy">
            ${c.hero.zh ? `<p class="hero-zh" lang="zh">${esc(c.hero.zh)}</p>` : ""}
            <h1>${esc(c.hero.h1)}</h1>
            <p class="sub">${esc(c.hero.subtitle)}</p>
            <ul class="chips">
            ${specChips}
            </ul>
          </div>

          <div class="form-card" id="form-lead">
            <h2>${esc(c.form.heading)}</h2>
            <p class="form-sub">${esc(c.contact.phoneDisplay)} · Respuesta rápida por WhatsApp</p>

            <!-- Netlify Forms: detectado por el bot en el HTML desplegado -->
            <form
              name="${esc(c.formName)}"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              id="lead-form"
              action="/${esc(c.outDir)}/?ok=1#form-lead"
            >
              <input type="hidden" name="form-name" value="${esc(c.formName)}" />
              <p hidden><label>No llenar: <input name="bot-field" /></label></p>

              <div class="field">
                <label for="f-name">${esc(c.form.nameLabel)}</label>
                <input id="f-name" name="nombre" type="text" required autocomplete="name" maxlength="50" pattern="[A-Za-zÁÉÍÓÚáéíóúÑñÜü .'-]{2,50}" title="Solo letras (sin números), 2 a 50 caracteres" placeholder="${esc(c.form.namePlaceholder)}" />
              </div>
              <div class="field">
                <label for="f-phone">${esc(c.form.phoneLabel)}</label>
                <input id="f-phone" name="telefono" type="tel" required autocomplete="tel" inputmode="tel" maxlength="14" pattern="\\+?[0-9]{10,13}" title="10 dígitos más el código de país (ej. +52...)" placeholder="${esc(c.form.phonePlaceholder)}" />
              </div>
              <div class="field">
                <label for="f-type">${esc(c.form.typeLabel)}</label>
                <select id="f-type" name="tipo_de_nave" required>
                  <option value="" disabled selected>Selecciona…</option>
                ${typeOptions}
                </select>
              </div>
              <button class="btn btn-primary" type="submit">${esc(c.form.submitLabel)}</button>
              <p class="disclaimer">${esc(c.form.disclaimer)}</p>
            </form>

            <div class="form-success" id="form-success">${esc(c.form.successMessage)}</div>
          </div>
        </div>
      </section>

      <!-- CONFIANZA -->
      <section class="block">
        <div class="wrap">
          <div class="section-head">
            <h2 class="section-title">${esc(c.trust.heading)}</h2>
          </div>
          <div class="stats">
            ${trustStats}
          </div>
          <ul class="points">
            ${trustPoints}
          </ul>
        </div>
      </section>

      <!-- ZONAS -->
      <section class="block alt">
        <div class="wrap">
          <div class="section-head">
            <h2 class="section-title">${esc(c.zonesHeading)}</h2>
          </div>
          <ul class="zones">
            ${zoneChips}
          </ul>
        </div>
      </section>

      <!-- CTA FINAL -->
      <section class="block final-cta">
        <div class="wrap">
          <div class="section-head">
            <h2 class="section-title">${esc(c.hero.ctaLabel)} hoy mismo</h2>
          </div>
          <div class="cta-row">
            <a class="btn btn-primary" href="#form-lead">${esc(c.form.submitLabel)}</a>
            <a class="btn btn-wa" href="${waHref}" target="_blank" rel="noopener" data-wa data-wa-location="final">
              ${waIcon}
              ${esc(c.hero.whatsappLabel)}: ${esc(c.contact.phoneDisplay)}
            </a>
          </div>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="wrap">
        <span>© <span id="yr"></span> ${esc(c.brand)}. ${esc(c.footer.note)}</span>
        <a href="${telHref}" data-wa-tel>${esc(c.contact.phoneDisplay)}</a>
      </div>
    </footer>

    <!-- Botón flotante WhatsApp (siempre visible) -->
    <a class="wa-float" href="${waHref}" target="_blank" rel="noopener" data-wa data-wa-location="float" aria-label="Contáctanos por WhatsApp">
      ${waIcon}
      <span class="badge">!</span>
    </a>

    <script>
      // dataLayer para GTM (contenedor ${c.gtmId})
      window.dataLayer = window.dataLayer || [];

      // Año dinámico del footer
      document.getElementById('yr').textContent = new Date().getFullYear();

      // whatsapp_click en cada clic de WhatsApp (botones + flotante)
      document.querySelectorAll('[data-wa]').forEach(function (el) {
        el.addEventListener('click', function () {
          window.dataLayer.push({
            event: 'whatsapp_click',
            wa_location: el.getAttribute('data-wa-location') || 'unknown'
          });
        });
      });
      document.querySelectorAll('[data-wa-tel]').forEach(function (el) {
        el.addEventListener('click', function () {
          window.dataLayer.push({ event: 'phone_click' });
        });
      });

      // Envío del formulario vía AJAX a Netlify Forms.
      // Evita el POST de página completa (que con el rewrite catch-all del SPA
      // devuelve un 404 de Netlify) y muestra el éxito sin navegar.
      var form = document.getElementById('lead-form');
      var ok = document.getElementById('form-success');
      function showSuccess() {
        if (form) form.style.display = 'none';
        if (ok) ok.style.display = 'block';
      }
      if (form) {
        // Filtrado en vivo: teléfono solo números (+ código de país), nombre solo letras.
        var phoneEl = form.querySelector('[name="telefono"]');
        if (phoneEl) {
          phoneEl.addEventListener('input', function () {
            // Permite un "+" inicial y hasta 13 dígitos (código de país + 10).
            var v = phoneEl.value.replace(/[^\\d+]/g, '');
            v = v.replace(/(?!^)\\+/g, '');            // solo un "+" y al inicio
            var plus = v.charAt(0) === '+' ? '+' : '';
            var digits = v.replace(/\\D/g, '').slice(0, 13);
            phoneEl.value = plus + digits;
          });
        }
        var nameEl = form.querySelector('[name="nombre"]');
        if (nameEl) {
          nameEl.addEventListener('input', function () {
            nameEl.value = nameEl.value
              .replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñÜü .'-]/g, '')
              .slice(0, 50);
          });
        }
        form.addEventListener('submit', function (e) {
          e.preventDefault();

          var tipo = (form.querySelector('[name="tipo_de_nave"]') || {}).value || '';
          window.dataLayer.push({ event: 'form_submit_lead', lead_tipo_nave: tipo });
${supabaseInsertJs}
          var btn = form.querySelector('button[type="submit"]');
          var btnText = btn ? btn.textContent : '';
          if (btn) { btn.disabled = true; btn.textContent = 'Enviando…'; }

          var body = new URLSearchParams(new FormData(form)).toString();
          fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: body
          })
          .then(function (res) {
            if (!res.ok) throw new Error('HTTP ' + res.status);
            showSuccess();
            try { history.replaceState(null, '', location.pathname + '?ok=1#form-lead'); } catch (err) {}
          })
          .catch(function () {
            if (btn) { btn.disabled = false; btn.textContent = btnText; }
            alert('Hubo un problema al enviar. Inténtalo de nuevo o escríbenos por WhatsApp.');
          });
        });
      }

      // Mensaje de éxito al volver de Netlify (?ok=1) — respaldo sin JS de fetch
      if (new URLSearchParams(location.search).get('ok') === '1') {
        showSuccess();
      }
    </script>
  </body>
</html>
`;

const outPath = resolve(
  __dirname,
  "..",
  "client",
  "public",
  c.outDir,
  "index.html",
);
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, html, "utf8");
console.log("✓ Landing generada en", outPath);
