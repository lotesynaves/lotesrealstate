import BlogPostCard from '../BlogPostCard';

export default function BlogPostCardExample() {
  return (
    <div className="p-4 max-w-sm">
      <BlogPostCard
        title="Cómo Elegir la Nave Industrial Perfecta para tu Negocio"
        excerpt="Descubre los factores clave que debes considerar al buscar una nave industrial, desde la ubicación hasta las especificaciones técnicas."
        coverImage="https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=800&q=80"
        category="Guías"
        publishedAt="15 Dic 2024"
        hasVideos={true}
        onClick={() => console.log('Blog post clicked')}
      />
    </div>
  );
}
