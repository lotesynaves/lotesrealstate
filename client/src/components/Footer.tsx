import { Building2, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-card border-t mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">NavesIndustriales</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Tu socio confiable en bienes raíces industriales y comerciales.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Categorías</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/propiedades?category=naves" className="hover:text-foreground transition-colors" data-testid="link-naves">
                  Naves Industriales
                </Link>
              </li>
              <li>
                <Link href="/propiedades?category=casas" className="hover:text-foreground transition-colors" data-testid="link-casas">
                  Casas
                </Link>
              </li>
              <li>
                <Link href="/propiedades?category=locales" className="hover:text-foreground transition-colors" data-testid="link-locales">
                  Locales Comerciales
                </Link>
              </li>
              <li>
                <Link href="/propiedades?category=oficinas" className="hover:text-foreground transition-colors" data-testid="link-oficinas">
                  Oficinas
                </Link>
              </li>
              <li>
                <Link href="/propiedades?category=terrenos" className="hover:text-foreground transition-colors" data-testid="link-terrenos">
                  Terrenos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Blog</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/blog" className="hover:text-foreground transition-colors" data-testid="link-blog">
                  Artículos Recientes
                </Link>
              </li>
              <li>
                <Link href="/blog?category=guias" className="hover:text-foreground transition-colors" data-testid="link-guides">
                  Guías
                </Link>
              </li>
              <li>
                <Link href="/blog?category=noticias" className="hover:text-foreground transition-colors" data-testid="link-news">
                  Noticias
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2" data-testid="text-phone">
                <Phone className="h-4 w-4" />
                +52 442 123 4567
              </li>
              <li className="flex items-center gap-2" data-testid="text-email">
                <Mail className="h-4 w-4" />
                info@navesindustriales.com
              </li>
              <li className="flex items-start gap-2" data-testid="text-address">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>Querétaro, México</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2024 NavesIndustriales. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
