import CategoryTab from '../CategoryTab';
import { Warehouse } from 'lucide-react';

export default function CategoryTabExample() {
  return (
    <div className="p-4 flex gap-2">
      <CategoryTab
        icon={Warehouse}
        label="Naves Industriales"
        count={24}
        active={true}
        onClick={() => console.log('Category clicked')}
      />
      <CategoryTab
        icon={Warehouse}
        label="Locales Comerciales"
        count={12}
        active={false}
        onClick={() => console.log('Category clicked')}
      />
    </div>
  );
}
