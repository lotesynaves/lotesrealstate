import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useEffect, useState } from "react";

interface HeroSectionProps {
  onPlayVideo?: () => void;
}

const heroImages = [
  '/images/hero/1.jpg',
  '/images/hero/2.jpg',
  '/images/hero/3.jpg',
  '/images/hero/4.jpg',
  '/images/hero/5.jpg'
];

export default function HeroSection({ onPlayVideo }: HeroSectionProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      // Wait for the fade-out transition to complete before changing the image
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
        );
        setIsTransitioning(false);
      }, 500); // This should match the transition duration in the CSS
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          {heroImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Industrial property ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>
      </div>

      {/* Content */}
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
