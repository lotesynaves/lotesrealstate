import { Button } from "@/components/ui/button";
import { Play, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HeroSectionProps {
  onPlayVideo?: () => void;
  onSearch?: (params: { location: string; category: string; operation: string }) => void;
}

export default function HeroSection({ onPlayVideo, onSearch }: HeroSectionProps) {
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

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            size="lg"
            variant="default"
            className="gap-2 text-lg"
            data-testid="button-search-properties"
          >
            <Search className="h-5 w-5" />
            Buscar Propiedades
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

        <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm rounded-lg p-6 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="Ubicación..."
              className="md:col-span-2"
              data-testid="input-location"
            />
            <Select>
              <SelectTrigger data-testid="select-category">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="naves">Naves Industriales</SelectItem>
                <SelectItem value="casas">Casas</SelectItem>
                <SelectItem value="locales">Locales Comerciales</SelectItem>
                <SelectItem value="oficinas">Oficinas</SelectItem>
                <SelectItem value="terrenos">Terrenos</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger data-testid="select-operation">
                <SelectValue placeholder="Operación" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="renta">Renta</SelectItem>
                <SelectItem value="venta">Venta</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-12 flex gap-8 justify-center text-white/90">
          <div className="text-center">
            <p className="text-4xl font-bold font-['DM_Sans']" data-testid="text-stat-properties">500+</p>
            <p className="text-sm">Propiedades</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold font-['DM_Sans']" data-testid="text-stat-clients">1,200+</p>
            <p className="text-sm">Clientes Satisfechos</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold font-['DM_Sans']" data-testid="text-stat-years">15+</p>
            <p className="text-sm">Años de Experiencia</p>
          </div>
        </div>
      </div>
    </div>
  );
}
