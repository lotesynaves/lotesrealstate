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
      className={`flex items-center gap-2 whitespace-nowrap transition-colors duration-200 ${
        active 
          ? 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white' 
          : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
      }`}
      onClick={onClick}
      data-testid={`button-category-${label.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
      {count !== undefined && (
        <span className={`ml-1 ${active ? 'opacity-90' : 'opacity-70 dark:opacity-80'}`}>
          ({count})
        </span>
      )}
    </Button>
  );
}
