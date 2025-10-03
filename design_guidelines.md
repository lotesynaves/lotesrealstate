# Design Guidelines: Industrial Real Estate Landing Platform

## Design Approach

**Reference-Based Approach**: Drawing inspiration from premium real estate platforms (Airbnb property listings, Zillow's property details, Idealista's European aesthetic) combined with industrial/commercial real estate professionalism.

**Core Principles**:
- Trust and credibility through professional presentation
- Visual storytelling with prominent imagery and video
- Efficient property discovery with clear categorization
- Mobile-first responsive design (70% of property browsing happens on mobile)
- Cultural adaptation for Latin American market (WhatsApp prominence, Spanish UI patterns)

---

## Color Palette

### Light Mode (Primary)
- **Primary Brand**: 217 71% 45% (Professional blue - trust and stability)
- **Primary Hover**: 217 71% 38%
- **Accent**: 25 85% 55% (Warm terracotta for CTAs - stands out without being aggressive)
- **Success**: 142 71% 45% (Property availability status)
- **Background**: 0 0% 100%
- **Surface**: 210 20% 98%
- **Surface Elevated**: 0 0% 100%
- **Text Primary**: 222 47% 11%
- **Text Secondary**: 215 16% 47%
- **Border**: 214 32% 91%

### Dark Mode (Secondary)
- **Primary Brand**: 217 71% 55%
- **Primary Hover**: 217 71% 48%
- **Accent**: 25 85% 60%
- **Background**: 222 47% 11%
- **Surface**: 217 33% 17%
- **Surface Elevated**: 217 33% 20%
- **Text Primary**: 210 20% 98%
- **Text Secondary**: 215 20% 65%
- **Border**: 217 33% 25%

---

## Typography

**Font Stack**:
- **Primary (Headings)**: 'Inter' - Google Fonts, weights 600, 700, 800
- **Secondary (Body)**: 'Inter' - weights 400, 500, 600
- **Accent (Numbers/Stats)**: 'DM Sans' - Google Fonts, weight 700

**Scale**:
- **Hero Headline**: text-5xl md:text-7xl, font-bold, tracking-tight
- **Section Titles**: text-3xl md:text-5xl, font-bold
- **Property Titles**: text-2xl md:text-3xl, font-semibold
- **Body Large**: text-lg, font-medium
- **Body Regular**: text-base
- **Caption**: text-sm, text-secondary

---

## Layout System

**Spacing Primitives**: Use Tailwind units of **4, 6, 8, 12, 16, 20, 24** for consistent rhythm
- Component padding: p-4, p-6, p-8
- Section spacing: py-16, py-20, py-24
- Grid gaps: gap-4, gap-6, gap-8

**Container Strategy**:
- Max-width: max-w-7xl for content sections
- Full-bleed for hero and property showcases
- Content width: max-w-4xl for text-heavy sections (blog posts)

**Grid System**:
- Property cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Category tabs: horizontal scroll on mobile, full display on desktop
- Blog posts: grid-cols-1 md:grid-cols-2 lg:grid-cols-3

---

## Component Library

### Navigation
- Sticky header with logo left, category links center, CTA right
- Mobile: hamburger menu with slide-out drawer
- Category pills with active state (bg-primary, text-white)
- Search bar with location autocomplete (prominent on desktop)

### Hero Section
- Full-viewport height (min-h-screen) with background image or video
- Overlay gradient (from transparent to bg-black/60)
- Centered content: headline, subheadline, dual CTA buttons
- Property search bar integrated (location + category + operation type)
- Floating trust badges: "500+ Propiedades" "Asesoría Gratuita"

### Property Cards
- Aspect ratio 16:10 for main image
- Image carousel with dots indicator
- Top-left badge for operation type (Renta/Venta)
- Top-right badge with video icon if videos present
- Card content: title, location, area, price (large, bold)
- Bottom: quick specs grid (3-4 key features with icons)
- Hover: subtle lift (shadow-lg) and image zoom (1.05 scale)

### Property Detail Page
- Hero gallery: main image with thumbnail strip below (6-8 thumbnails)
- Sticky sidebar on desktop with: price, specs, contact form
- Tabbed sections: Descripción | Características | Ubicación | Videos
- Video grid: 2-3 columns, thumbnail with play icon → modal player
- WhatsApp CTA: fixed bottom on mobile, in sidebar on desktop

### Blog Components
- Featured post: large card with image left, content right (50/50)
- Standard posts: vertical cards with image top, content below
- Category filter: pill buttons with count badges
- Post detail: max-w-prose for optimal reading, images full-bleed within

### Form Elements
- Input fields: rounded-lg, border-2, focus:ring-2 focus:ring-primary
- Labels: text-sm font-medium mb-2
- Textarea: min-h-32
- Submit button: full-width on mobile, auto on desktop
- WhatsApp button: bg-[#25D366] with WhatsApp icon, opens pre-filled message

### Video Integration
- Thumbnail with centered play icon (circle bg-white/20 backdrop-blur)
- Modal: centered iframe with close button, backdrop-blur background
- Lazy load iframe on click (don't embed until user interaction)

---

## Section-Specific Design

### Home Page Structure
1. **Hero** (100vh): Full-screen image with integrated search
2. **Categories** (auto): Icon cards for each property type (5 columns on desktop)
3. **Featured Properties** (auto): 6-8 cards in grid, "Ver todas" link
4. **Value Propositions** (auto): 3-column grid with icons, headlines, descriptions
5. **Location Showcase** (auto): Map integration with available areas highlighted
6. **Latest Blog Posts** (auto): 3 recent posts in grid
7. **Contact CTA** (auto): Split layout - form left, info/map right
8. **Footer** (auto): 4-column layout - about, categories, blog, contact

### Property Listing Page
- Filter sidebar (collapsible on mobile): category, operation, price range, area, location
- Sort dropdown: Más recientes, Precio menor, Precio mayor, Área
- Grid results with pagination (24 per page)
- Map toggle: switch between grid and map view

### Admin Panel
- Minimal, functional design (not customer-facing)
- Sidebar navigation with sections: Properties, Blog, Leads, Site Content
- Data tables with search, filters, actions (edit, delete, toggle status)
- Forms: clear sections, validation feedback, autosave indicators

---

## Images

**Required Images**:
1. **Hero Background**: Industrial warehouse exterior, modern facility, or aerial view of industrial park (1920x1080 minimum)
2. **Property Cards**: Each property needs 5-8 images showing exterior, interior, facilities, location
3. **Category Icons**: Simple line icons for naves, casas, locales, oficinas, terrenos
4. **Value Proposition Icons**: 3-4 icons representing key benefits (location, pricing, support, etc.)
5. **Blog Post Covers**: Featured images for each blog post (1200x630)
6. **Team/About**: Professional photos if including company info section

**Image Treatment**:
- Subtle overlay (gradient or solid color at 20-40% opacity) on hero images
- Rounded corners (rounded-lg) for all property images
- Border on cards (border border-gray-200 dark:border-gray-700)
- Lazy loading for all images below the fold

---

## Responsive Behavior

**Breakpoints**:
- Mobile: < 768px (single column, stacked layout)
- Tablet: 768px - 1024px (2 columns for most grids)
- Desktop: > 1024px (3-4 columns, sidebar layouts active)

**Mobile Optimizations**:
- Sticky category tabs with horizontal scroll
- Bottom-fixed WhatsApp CTA on property pages
- Collapsible filters with apply button
- Touch-friendly tap targets (min 44x44px)
- Swipeable image galleries