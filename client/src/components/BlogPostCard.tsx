import { Calendar, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface BlogPostCardProps {
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  publishedAt: string;
  hasVideos: boolean;
  onClick?: () => void;
}

export default function BlogPostCard({
  title,
  excerpt,
  coverImage,
  category,
  publishedAt,
  hasVideos,
  onClick,
}: BlogPostCardProps) {
  return (
    <Card
      className="overflow-hidden hover-elevate active-elevate-2 cursor-pointer group"
      onClick={onClick}
      data-testid={`card-post-${title.toLowerCase().replace(/\s+/g, '-').substring(0, 30)}`}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
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
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" data-testid={`badge-category-${category.toLowerCase()}`}>
            {category}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span data-testid="text-date">{publishedAt}</span>
          </div>
        </div>
        <h3 className="font-semibold text-lg mb-2 line-clamp-2" data-testid="text-post-title">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2" data-testid="text-excerpt">
          {excerpt}
        </p>
      </CardContent>
    </Card>
  );
}
