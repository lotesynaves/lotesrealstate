import { Building2, MapPin, Maximize2, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export type OperationType = "renta" | "venta";

interface PropertyCardProps {
  id: string;
  title: string;
  category: string;
  operation: OperationType;
  location: string;
  area: number;
  price: number;
  currency: string;
  coverImage: string;
  hasVideos: boolean;
  onClick?: () => void;
}

export default function PropertyCard({
  title,
  category,
  operation,
  location,
  area,
  price,
  currency,
  coverImage,
  hasVideos,
  onClick,
}: PropertyCardProps) {
  return (
    <Card
      className="overflow-hidden hover-elevate active-elevate-2 cursor-pointer group"
      onClick={onClick}
      data-testid={`card-property-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className="bg-primary text-primary-foreground" data-testid={`badge-operation-${operation}`}>
            {operation === "renta" ? "Renta" : "Venta"}
          </Badge>
        </div>
        {hasVideos && (
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="gap-1" data-testid="badge-video">
              <Video className="h-3 w-3" />
              Video
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1" data-testid="text-property-title">
          {title}
        </h3>
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
          <MapPin className="h-4 w-4" />
          <span className="line-clamp-1" data-testid="text-location">{location}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Maximize2 className="h-4 w-4" />
            <span data-testid="text-area">{area.toLocaleString()} m²</span>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold font-['DM_Sans']" data-testid="text-price">
              {currency} {price.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="mt-3 flex gap-2 flex-wrap">
          <Badge variant="outline" className="text-xs" data-testid={`badge-category-${category}`}>
            <Building2 className="h-3 w-3 mr-1" />
            {category}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
