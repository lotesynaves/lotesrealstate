import PropertyCard from '../PropertyCard';

export default function PropertyCardExample() {
  return (
    <div className="p-4 max-w-sm">
      <PropertyCard
        id="1"
        title="Nave Industrial Moderna con Amplio Patio"
        category="Naves Industriales"
        operation="renta"
        location="Querétaro, Parque Industrial El Marqués"
        area={2500}
        price={85000}
        currency="$"
        coverImage="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80"
        hasVideos={true}
        onClick={() => console.log('Property card clicked')}
      />
    </div>
  );
}
