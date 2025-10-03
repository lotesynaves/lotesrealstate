import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface CategoryTabProps {
  icon: LucideIcon;
  label: string;
  count?: number;
  active?: boolean;
  onClick?: () => void;
}

export default function CategoryTab({
  icon: Icon,
  label,
  count,
  active = false,
  onClick,
}: CategoryTabProps) {
  return (
    <Button
      variant={active ? "default" : "outline"}
      className={`flex items-center gap-2 whitespace-nowrap ${active ? '' : 'hover-elevate active-elevate-2'}`}
      onClick={onClick}
      data-testid={`button-category-${label.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
      {count !== undefined && (
        <span className="ml-1 opacity-70">({count})</span>
      )}
    </Button>
  );
}
