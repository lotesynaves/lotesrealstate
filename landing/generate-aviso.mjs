// ============================================================================
//  GENERADOR DE LA PÁGINA ESTÁTICA DE AVISO DE PRIVACIDAD
// ----------------------------------------------------------------------------
//  Lee landing/aviso-de-privacidad.md (texto oficial, el MISMO de
//  ardequeretaro.com) y emite un HTML 100% estático con el estilo del sitio
//  en client/public/aviso-de-privacidad/index.html. Vite copia
//  client/public/** verbatim a dist/public/** en el build, y Netlify sirve
//  el archivo estático en /aviso-de-privacidad (gana sobre el rewrite SPA).
//
//  IMPORTANTE: este generador NO corre en el build de Netlify (a diferencia de
//  landing/generate.mjs). El HTML resultante se commitea al repo. Si editas el
//  .md, REGENERA y vuelve a commitear el HTML a mano:
//
//      node landing/generate-aviso.mjs
//
//  El texto del .md debe permanecer EXACTO: no reescribir, no agregar ni quitar.
// ============================================================================

import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const mdPath = resolve(__dirname, "aviso-de-privacidad.md");
const outPath = resolve(
  __dirname,
  "..",
  "client",
  "public",
  "aviso-de-privacidad",
  "index.html",
);

// --- Escape de HTML para el texto del .md ----------------------------------
const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

// --- Inline: **negrita** (sobre texto ya escapado) --------------------------
const inline = (s) =>
  esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

// --- Conversor Markdown -> HTML --------------------------------------------
//  Soporta exactamente lo que usa el .md: #/##/###, **negrita**, listas con
//  "- ", listas numeradas "1." y párrafos. No hay enlaces en el texto fuente.
function mdToHtml(md) {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const out = [];
  let para = []; // acumulador de párrafo
  let list = null; // { type: 'ul'|'ol', items: [] }

  const flushPara = () => {
    if (para.length) {
      out.push(`<p>${inline(para.join(" "))}</p>`);
      para = [];
    }
  };
  const flushList = () => {
    if (list) {
      const items = list.items.map((it) => `<li>${inline(it)}</li>`).join("\n");
      out.push(`<${list.type}>\n${items}\n</${list.type}>`);
      list = null;
    }
  };
  const flushAll = () => {
    flushPara();
    flushList();
  };

  for (const raw of lines) {
    const line = raw.trimEnd();

    if (line.trim() === "") {
      flushAll();
      continue;
    }

    let m;
    if ((m = line.match(/^###\s+(.*)$/))) {
      flushAll();
      out.push(`<h3>${inline(m[1])}</h3>`);
    } else if ((m = line.match(/^##\s+(.*)$/))) {
      flushAll();
      out.push(`<h2>${inline(m[1])}</h2>`);
    } else if ((m = line.match(/^#\s+(.*)$/))) {
      flushAll();
      out.push(`<h1>${inline(m[1])}</h1>`);
    } else if ((m = line.match(/^-\s+(.*)$/))) {
      flushPara();
      if (!list || list.type !== "ul") {
        flushList();
        list = { type: "ul", items: [] };
      }
      list.items.push(m[1]);
    } else if ((m = line.match(/^\d+\.\s+(.*)$/))) {
      flushPara();
      if (!list || list.type !== "ol") {
        flushList();
        list = { type: "ol", items: [] };
      }
      list.items.push(m[1]);
    } else {
      flushList();
      para.push(line.trim());
    }
  }
  flushAll();
  return out.join("\n");
}

const md = readFileSync(mdPath, "utf8");
const body = mdToHtml(md);

const html = `<!DOCTYPE html>
<html lang="es-MX">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Aviso de Privacidad | ARDE</title>
    <meta name="description" content="Aviso de privacidad de ARDE Properties para los sitios ardequeretaro.com y navesylotesindustriales.com." />
    <meta name="robots" content="index, follow" />
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <meta name="theme-color" content="#1f6fd6" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
    <style>
      :root {
        /* Tokens calcados de client/src/index.css */
        --primary: 217 71% 45%;
        --foreground: 222 47% 11%;
        --muted-foreground: 215 16% 47%;
        --border: 214 32% 91%;
        --card: 210 20% 98%;
        --radius: 0.5rem;
        --shadow-sm: 0px 2px 4px -1px hsl(222 47% 11% / 0.06), 0px 1px 2px -1px hsl(222 47% 11% / 0.06);
        --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      }
      * { box-sizing: border-box; }
      html { -webkit-text-size-adjust: 100%; }
      body {
        margin: 0;
        font-family: var(--font-sans);
        color: hsl(var(--foreground));
        line-height: 1.65;
        background: #fff;
      }
      a { color: hsl(var(--primary)); }
      .wrap { width: 100%; max-width: 820px; margin: 0 auto; padding: 0 24px; }

      /* ---- Header ---- */
      .site-header {
        position: sticky; top: 0; z-index: 30;
        background: rgba(255,255,255,0.9); backdrop-filter: saturate(180%) blur(8px);
        border-bottom: 1px solid hsl(var(--border));
      }
      .site-header .wrap {
        display: flex; align-items: center; justify-content: space-between;
        padding-top: 14px; padding-bottom: 14px; gap: 12px; max-width: 1200px;
      }
      .brand-logo { height: 40px; width: auto; display: block; }
      .back-link {
        font-weight: 600; font-size: 15px; text-decoration: none; color: hsl(var(--muted-foreground));
      }
      .back-link:hover { color: hsl(var(--foreground)); }

      /* ---- Documento ---- */
      main { padding: 48px 0 64px; }
      main h1 {
        font-size: clamp(28px, 4vw, 40px); line-height: 1.15; letter-spacing: -0.025em;
        font-weight: 800; margin: 0 0 8px;
      }
      main h2 {
        font-size: clamp(20px, 2.6vw, 26px); letter-spacing: -0.02em; font-weight: 700;
        margin: 40px 0 12px; padding-top: 8px;
      }
      main h3 {
        font-size: 18px; font-weight: 700; margin: 24px 0 8px; color: hsl(var(--foreground));
      }
      main p { margin: 0 0 16px; }
      main ul, main ol { margin: 0 0 16px; padding-left: 24px; }
      main li { margin: 0 0 8px; }
      main strong { font-weight: 700; }

      /* ---- Footer ---- */
      footer.site-footer { padding: 32px 0; border-top: 1px solid hsl(var(--border)); color: hsl(var(--muted-foreground)); font-size: 14px; }
      footer.site-footer .wrap { display: flex; flex-wrap: wrap; gap: 8px 20px; align-items: center; justify-content: space-between; max-width: 1200px; }
      footer.site-footer a { text-decoration: none; font-weight: 700; }
    </style>
  </head>
  <body>
    <header class="site-header">
      <div class="wrap">
        <a href="/" aria-label="Inicio">
          <img class="brand-logo" src="/logo-arde.png" alt="ARDE" height="40" />
        </a>
        <a class="back-link" href="/">&larr; Volver al inicio</a>
      </div>
    </header>

    <main>
      <div class="wrap">
${body
  .split("\n")
  .map((l) => "        " + l)
  .join("\n")}
      </div>
    </main>

    <footer class="site-footer">
      <div class="wrap">
        <span>© <span id="yr">2026</span> ARDE</span>
        <a href="/aviso-de-privacidad">Aviso de privacidad</a>
      </div>
    </footer>

    <script>
      document.getElementById('yr').textContent = new Date().getFullYear();
    </script>
  </body>
</html>
`;

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, html, "utf8");
console.log("✓ Aviso de privacidad generado en", outPath);
