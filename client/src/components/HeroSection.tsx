import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface HeroSectionProps {
  onPlayVideo?: () => void;
}

export default function HeroSection({ onPlayVideo }: HeroSectionProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1565008576549-57569a49371d?w=1920&q=80"
          alt="Industrial warehouse"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6" data-testid="text-hero-title">
          Encuentra Tu Espacio Industrial Ideal
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto" data-testid="text-hero-subtitle">
          Renta y venta de naves industriales, locales comerciales, oficinas y terrenos
          en las mejores ubicaciones de México
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button
            asChild
            size="lg"
            variant="default"
            className="gap-2 text-lg bg-primary hover:bg-primary/90"
            data-testid="button-view-properties"
          >
            <a href="#propiedades">
              Ver Propiedades
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="gap-2 text-lg bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            onClick={onPlayVideo}
            data-testid="button-play-video"
          >
            <Play className="h-5 w-5" />
            Ver Video
          </Button>
        </div>
      </div>
    </div>
  );
}
