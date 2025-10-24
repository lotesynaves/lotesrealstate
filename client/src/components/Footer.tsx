import { Building2, Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-card border-t mt-20 w-full">
      <div className="max-w-7xl mx-auto px-6 py-12 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
            <h3 className="font-semibold mb-4">Redes sociales</h3>
            <ul className="flex items-center gap-1">
              <li>
                <Link 
                  href="https://facebook.com" 
                  className="group flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 transition-all duration-200 hover:bg-[#1877F2] hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-facebook"
                >
                  <Facebook className="h-4 w-4 group-hover:text-white" />
                </Link>
              </li>
              <li>
                <Link 
                  href="https://instagram.com" 
                  className="group flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 transition-all duration-200 hover:bg-gradient-to-br hover:from-[#FCAF45] hover:via-[#FF1493] hover:to-[#833AB4] hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-instagram"
                >
                  <Instagram className="h-4 w-4 group-hover:text-white" />
                </Link>
              </li>
              <li>
                <Link 
                  href="https://linkedin.com" 
                  className="group flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 transition-all duration-200 hover:bg-[#0A66C2] hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-linkedin"
                >
                  <Linkedin className="h-4 w-4 group-hover:text-white" />
                </Link>
              </li>
            </ul>
          </div>

          {/* <div>
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
          </div> */}

          <div>
            <h3 className="font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2" data-testid="text-phone">
                <Phone className="h-4 w-4" />
                4425922245
              </li>
              <li className="flex items-center gap-2" data-testid="text-email">
                <Mail className="h-4 w-4" />
                propiedades@navesylotesindustriales.com
              </li>
              <li className="flex items-start gap-2" data-testid="text-address">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>Sierra de Zimapán 4, Villas del Sol, 76046 Santiago de Querétaro, Qro.</span>
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
