// ============================================================================
//  CONFIG EDITABLE DE LA LANDING DE ADS — "Naves industriales en Querétaro"
// ----------------------------------------------------------------------------
//  Este es el ÚNICO archivo que editas para cambiar textos y datos de contacto.
//  Después de editar, regenera el HTML con:
//      node landing/generate.mjs
//  (En Netlify se regenera solo en cada deploy.)
// ============================================================================

export const config = {
  // --- Identidad / meta -----------------------------------------------------
  brand: "ARDE",
  // Logo del header. Deja logo.src vacío ("") para usar el texto de `brand`.
  logo: {
    src: "/lp-naves-queretaro/logo-arde-h80.png", // optimizado (80px alto, 11KB)
    alt: "ARDE",
    height: 40, // alto de despliegue en px
  },
  lang: "es-MX",
  // Ruta de salida relativa a client/public. Se sirve en /lp-naves-queretaro/
  outDir: "lp-naves-queretaro",

  // <title> y <meta description> (SEO / Ads)
  title: "Naves Industriales en Querétaro y el Bajío | Renta y Venta",
  metaDescription:
    "Naves industriales en Querétaro y el Bajío en renta y venta. m² a tu medida, altura libre, capacidad KVA y andenes de carga. Cotiza hoy por WhatsApp.",

  // --- Contacto (datos reales) ---------------------------------------------
  contact: {
    phoneDisplay: "442 461 3233",
    phoneRaw: "4424613233",
    whatsappNumber: "524424613233", // formato wa.me (52 + número)
    whatsappMessage:
      "Hola, me interesa una nave industrial en Querétaro. ¿Me pueden dar información?",
  },

  // --- Analytics ------------------------------------------------------------
  gtmId: "GTM-KH3RZMT7", // mismo contenedor del sitio, NO se duplica

  // --- Netlify Forms --------------------------------------------------------
  formName: "leads-naves-queretaro",

  // --- HERO / above the fold -----------------------------------------------
  hero: {
    // Imagen de fondo del hero (optimizada, misma estética que la home).
    // Ruta absoluta desde la raíz del sitio.
    image: "/lp-naves-queretaro/hero.jpg",
    imageAlt: "Interior de nave industrial en Querétaro",
    // Toque en chino (eyebrow discreto sobre el H1). Deja "" para ocultarlo.
    zh: "工业地产专家", // "expertos en bienes raíces industriales"
    // H1 — calca el mensaje de la campaña
    h1: "Naves Industriales en Querétaro y el Bajío",
    subtitle:
      "Renta y venta de naves industriales a la medida de tu operación: m² según tu proceso, altura libre, capacidad KVA y andenes de carga listos para operar.",
    // Chips de especificaciones técnicas visibles arriba
    specs: [
      "m² a tu medida",
      "Altura libre",
      "Capacidad KVA",
      "Andenes de carga",
    ],
    ctaLabel: "Cotizar mi nave",
    whatsappLabel: "WhatsApp directo",
  },

  // --- Formulario -----------------------------------------------------------
  form: {
    heading: "Recibe opciones de naves en menos de 24 h",
    nameLabel: "Nombre",
    namePlaceholder: "Tu nombre",
    phoneLabel: "Teléfono / WhatsApp",
    phonePlaceholder: "10 dígitos",
    typeLabel: "Tipo de nave",
    typeOptions: [
      "Renta de nave industrial",
      "Venta de nave industrial",
      "Nave a la medida (build to suit)",
      "Bodega / centro de distribución",
      "Aún no estoy seguro",
    ],
    submitLabel: "Quiero mi cotización",
    disclaimer:
      "Al enviar aceptas ser contactado por WhatsApp o teléfono. Sin costo ni compromiso.",
    successMessage:
      "¡Gracias! Recibimos tus datos. Un asesor te contactará muy pronto.",
  },

  // --- Señales de confianza (PLACEHOLDERS — ajústalos tú) -------------------
  trust: {
    heading: "Por qué elegirnos",
    stats: [
      { value: "+15 años", label: "de experiencia en el sector industrial" },
      { value: "+200", label: "propiedades gestionadas" },
      { value: "+10 zonas", label: "industriales cubiertas en el Bajío" },
    ],
    // Bullets editables
    points: [
      "Parques industriales certificados y con seguridad 24/7",
      "Acompañamiento en due diligence, contrato y adecuaciones",
      "Cobertura en Querétaro, El Marqués, Colón y corredor del Bajío",
    ],
  },

  // --- Zonas cubiertas ------------------------------------------------------
  zonesHeading: "Zonas que cubrimos",
  zones: [
    "Querétaro",
    "El Marqués",
    "Colón",
    "San Juan del Río",
    "Pedro Escobedo",
    "Corredor Bajío",
  ],

  // --- Footer ---------------------------------------------------------------
  footer: {
    note: "Naves industriales en Querétaro y el Bajío.",
  },
};
