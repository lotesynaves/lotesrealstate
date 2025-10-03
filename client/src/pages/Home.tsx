import { useState } from "react";
import { Warehouse, Home as HomeIcon, Store, Building, LandPlot } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import PropertyCard from "@/components/PropertyCard";
import CategoryTab from "@/components/CategoryTab";
import BlogPostCard from "@/components/BlogPostCard";
import ContactForm from "@/components/ContactForm";
import VideoModal from "@/components/VideoModal";
import { Button } from "@/components/ui/button";

//todo: remove mock functionality - mock properties data
const mockProperties = [
  {
    id: "1",
    title: "Nave Industrial Moderna con Amplio Patio",
    category: "Naves Industriales",
    operation: "renta" as const,
    location: "Querétaro, Parque Industrial El Marqués",
    area: 2500,
    price: 85000,
    currency: "$",
    coverImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
    hasVideos: true,
  },
  {
    id: "2",
    title: "Bodega Industrial 3,000 m² Ubicación Estratégica",
    category: "Naves Industriales",
    operation: "venta" as const,
    location: "Monterrey, Santa Catarina",
    area: 3000,
    price: 12500000,
    currency: "$",
    coverImage: "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=80",
    hasVideos: true,
  },
  {
    id: "3",
    title: "Local Comercial en Plaza Premium",
    category: "Locales Comerciales",
    operation: "renta" as const,
    location: "Guadalajara, Zona Centros Comerciales",
    area: 180,
    price: 45000,
    currency: "$",
    coverImage: "https://images.unsplash.com/photo-1555636222-cae831e670b3?w=800&q=80",
    hasVideos: false,
  },
  {
    id: "4",
    title: "Oficina Corporativa Equipada",
    category: "Oficinas",
    operation: "renta" as const,
    location: "Ciudad de México, Santa Fe",
    area: 250,
    price: 65000,
    currency: "$",
    coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    hasVideos: true,
  },
  {
    id: "5",
    title: "Terreno Industrial 5,000 m²",
    category: "Terrenos",
    operation: "venta" as const,
    location: "San Luis Potosí, Zona Industrial",
    area: 5000,
    price: 8000000,
    currency: "$",
    coverImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    hasVideos: false,
  },
  {
    id: "6",
    title: "Casa en Fraccionamiento Privado",
    category: "Casas",
    operation: "venta" as const,
    location: "Querétaro, Juriquilla",
    area: 320,
    price: 4500000,
    currency: "$",
    coverImage: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
    hasVideos: true,
  },
];

//todo: remove mock functionality - mock blog posts
const mockBlogPosts = [
  {
    title: "Cómo Elegir la Nave Industrial Perfecta para tu Negocio",
    excerpt: "Descubre los factores clave que debes considerar al buscar una nave industrial.",
    coverImage: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=800&q=80",
    category: "Guías",
    publishedAt: "15 Dic 2024",
    hasVideos: true,
  },
  {
    title: "Tendencias en Bienes Raíces Industriales 2024",
    excerpt: "Análisis del mercado inmobiliario industrial y las proyecciones para el próximo año.",
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    category: "Noticias",
    publishedAt: "10 Dic 2024",
    hasVideos: false,
  },
  {
    id: "3",
    title: "Ventajas de Invertir en Propiedades Industriales",
    excerpt: "Por qué las propiedades industriales son una excelente opción de inversión.",
    coverImage: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
    category: "Inversión",
    publishedAt: "5 Dic 2024",
    hasVideos: true,
  },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const categories = [
    { icon: Warehouse, label: "Todas", key: "all", count: mockProperties.length },
    { icon: Warehouse, label: "Naves Industriales", key: "naves", count: 2 },
    { icon: HomeIcon, label: "Casas", key: "casas", count: 1 },
    { icon: Store, label: "Locales", key: "locales", count: 1 },
    { icon: Building, label: "Oficinas", key: "oficinas", count: 1 },
    { icon: LandPlot, label: "Terrenos", key: "terrenos", count: 1 },
  ];

  const filteredProperties = selectedCategory === "all"
    ? mockProperties
    : mockProperties.filter(p => {
        const categoryMap: Record<string, string> = {
          naves: "Naves Industriales",
          casas: "Casas",
          locales: "Locales Comerciales",
          oficinas: "Oficinas",
          terrenos: "Terrenos"
        };
        return p.category === categoryMap[selectedCategory];
      });

  return (
    <div>
      <HeroSection onPlayVideo={() => setVideoModalOpen(true)} />

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4" data-testid="text-featured-title">
            Propiedades Destacadas
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explora nuestra selección de propiedades industriales y comerciales premium
          </p>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
          {categories.map((cat) => (
            <CategoryTab
              key={cat.key}
              icon={cat.icon}
              label={cat.label}
              count={cat.count}
              active={selectedCategory === cat.key}
              onClick={() => setSelectedCategory(cat.key)}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              {...property}
              onClick={() => console.log('Property clicked:', property.id)}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" data-testid="button-view-all">
            Ver Todas las Propiedades
          </Button>
        </div>
      </section>

      <section className="bg-card py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4" data-testid="text-blog-title">
              Últimos Artículos
            </h2>
            <p className="text-lg text-muted-foreground">
              Mantente informado sobre el mercado inmobiliario industrial
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockBlogPosts.map((post, index) => (
              <BlogPostCard
                key={index}
                {...post}
                onClick={() => console.log('Blog post clicked')}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" data-testid="button-view-blog">
              Ver Todos los Artículos
            </Button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6" data-testid="text-contact-title">
              ¿Listo para Encontrar tu Propiedad Ideal?
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Nuestro equipo de expertos está listo para ayudarte a encontrar el espacio perfecto
              para tu negocio. Contáctanos hoy mismo.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Building className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">500+ Propiedades</h3>
                  <p className="text-sm text-muted-foreground">En nuestra cartera</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Warehouse className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Asesoría Gratuita</h3>
                  <p className="text-sm text-muted-foreground">Sin compromiso</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card p-8 rounded-lg border">
            <h3 className="text-2xl font-bold mb-6">Contáctanos</h3>
            <ContactForm
              onSubmit={(data) => console.log('Contact form submitted:', data)}
            />
          </div>
        </div>
      </section>

      <VideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        youtubeId="dQw4w9WgXcQ"
        title="Conoce Nuestras Propiedades"
      />
    </div>
  );
}
