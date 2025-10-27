import { useState } from "react";
import { useLocation } from "wouter";
import { Warehouse, Home as HomeIcon, Store, Building, LandPlot } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import HeroSection from "@/components/HeroSection";
import SearchBar from "@/components/SearchBar";
import PropertyCard from "@/components/PropertyCard";
import CategoryTab from "@/components/CategoryTab";
import BlogPostCard from "@/components/BlogPostCard";
import VideoModal from "@/components/VideoModal";
import PropertyDetailsModal from "@/components/PropertyDetailsModal";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

// Import data
import blogPostsData from "@/data/blogPosts.json";
import categoriesData from "@/data/categories.json";
import textsData from "@/data/texts.json";

// Hooks
import useProperties from "@/hooks/useProperties";

// Types
import { Property, OperationType } from "@/types/property";

const Home = () => {
  const [location, setLocation] = useLocation();
  const { properties: allProperties, loading, error } = useProperties();
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedOperation, setSelectedOperation] = useState<OperationType | "all">("all");

  const handleSearch = (params: { location: string; category: string; operation: string }) => {
    // Only update search params if at least one field has a value
    if (params.location || params.category || params.operation) {
      setSearchQuery(params.location || params.category || params.operation);
    }
  };

  // Helper function to normalize category names for comparison
  const normalizeCategory = (category: string) => {
    return category.toLowerCase().replace(/\s+/g, '');
  };

  // console.log("allProperties", allProperties);
  // console.log("searchQuery", searchQuery);

  // Filter properties based on search query, category, and operation
  // Reemplaza la función de filtrado actual con esta versión mejorada
  const filteredProperties = allProperties.filter(property => {
    if (!property) return false;

    // Función para normalizar texto (quitar acentos, espacios y convertir a minúsculas)
    const normalize = (text: string) => {
      if (!text) return '';
      return text
        .toLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, ' '); // Reemplazar múltiples espacios por uno solo
    };

    const searchTerm = normalize(searchQuery);
    const propertyLocation = normalize(property.location || '');
    const propertyTitle = normalize(property.title || '');
    const propertyDescription = normalize(property.description || '');
    const propertyCategory = normalize(property.category || '');
    const propertyOperation = normalize(property.operation || '');

    // Buscar en título, ubicación y descripción
    const matchesSearch =
      searchTerm === '' ||
      propertyLocation.includes(searchTerm) ||
      propertyTitle.includes(searchTerm) ||
      propertyDescription.includes(searchTerm);

    // Depuración

    const matchesCategory =
      selectedCategory === "all" ||
      propertyCategory === normalize(selectedCategory) ||
      propertyCategory === selectedCategory.toLowerCase(); // Agregamos esta línea

    const matchesOperation =
      selectedOperation === "all" ||
      propertyOperation === normalize(selectedOperation) ||
      propertyOperation === selectedOperation.toLowerCase(); // Y esta para operación
    return matchesSearch && matchesCategory && matchesOperation;
  });

  // Extraer datos de los archivos JSON
  const { blogPosts: mockBlogPosts } = blogPostsData;
  const { categories: categoriesList } = categoriesData;
  const { hero, featuredProperties, blog, contact, buttons } = textsData;

  // Mapear íconos de las categorías
  const iconComponents: Record<string, any> = {
    warehouse: Warehouse,
    home: HomeIcon,
    store: Store,
    building: Building,
    land: LandPlot
  };

 const handleCategorySelect = (categoryKey: string) => {
  setSelectedCategory(categoryKey === selectedCategory ? "all" : categoryKey);
  // Also clear the search query when changing categories
  setSearchQuery("");
};

  // Añadir componentes de íconos a las categorías
  const categories = categoriesList.map(cat => ({
    ...cat,
    icon: iconComponents[cat.icon] || Warehouse,
    count: cat.key === 'all'
      ? allProperties.length
      : allProperties.filter(p =>
        p.category.toLowerCase().includes(cat.key.toLowerCase())
      ).length
  }));

  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection onPlayVideo={() => setIsVideoModalOpen(true)} />

      <main className="flex-1">
        <section id="propiedades" className="py-12 px-4 container mx-auto">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div>
              <h1 className="text-3xl font-bold text-center mb-8">Propiedades Disponibles</h1>
              <SearchBar onSearch={handleSearch} onClearFilters={() => setSearchQuery("")} />
              {/* Category Tabs - Pills on mobile, Cards on larger screens */}
              <div className="w-full mb-8 mt-6">
                <div className="flex flex-wrap justify-center gap-2 sm:gap-4 px-2 sm:px-0">
                  {categories.map((category) => {
                    const isActive = selectedCategory === category.key;
                    const Icon = category.icon;

                    return (
                      <button
                        key={category.key}
                        onClick={() => handleCategorySelect(category.key)}
                        className={`
                      relative flex items-center justify-between sm:justify-center
                      px-4 py-2.5 sm:py-4 rounded-full sm:rounded-xl
                      transition-all duration-200 ease-in-out
                      border-2 
                      hover:shadow-md active:scale-[0.98]
                      sm:hover:-translate-y-1
                      text-sm sm:text-base
                      h-11 sm:h-32
                      min-w-[120px] sm:min-w-0 sm:w-32
                      ${isActive
                            ? 'bg-blue-600 dark:bg-blue-700 text-white shadow-sm sm:shadow-md border-blue-700 dark:border-blue-600'
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500'
                          }
                    `}
                      >
                        {/* Mobile View - Text and count with better spacing */}
                        <div className="flex items-center justify-between w-full sm:hidden">
                          <span className="font-medium text-sm">{category.label}</span>
                          <span className={`flex items-center justify-center h-5 min-w-[24px] px-1.5 rounded-full text-xs font-medium ${isActive
                            ? 'bg-blue-500/90 text-white'
                            : 'bg-gray-100 dark:bg-gray-700/80 text-gray-600 dark:text-gray-300'
                            }`}>
                            {category.count}
                          </span>
                        </div>

                        {/* Desktop View - Full card with icon */}
                        <div className="hidden sm:flex flex-col items-center justify-center w-full h-full px-2">
                          <Icon
                            className={`h-8 w-8 mb-2.5 transition-colors duration-200 ${isActive
                              ? 'text-white'
                              : 'text-blue-600 dark:text-blue-400'
                              }`}
                          />
                          <span className="text-sm font-medium text-center leading-tight">{category.label}</span>
                          <span className={`text-xs mt-1.5 ${isActive
                            ? 'text-blue-100/90 dark:text-blue-200/90'
                            : 'text-gray-500/90 dark:text-gray-400/90'
                            }`}>
                            ({category.count})
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Property Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map(property => (
                  <PropertyCard
                    key={property.id}
                    {...property}
                    onClick={() => setSelectedProperty(property)}
                  />
                ))}
              </div>
            </div>


          )}
          {/* Contact Section */}
          <section id="contacto" className="relative w-full py-12  dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 transition-colors duration-200  md:my-20">
            {/* Background pattern - only visible in dark mode */}
            <div className="absolute inset-0 hidden dark:block">
              <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]"></div>
            </div>

            <div className="relative w-full max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="w-full bg-white dark:bg-gray-800/70 dark:backdrop-blur-sm rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700/50">
                <ContactForm />
              </div>
            </div>
          </section>

          {/* Property Details Modal */}
          {selectedProperty && (
            <PropertyDetailsModal
              property={selectedProperty}
              onClose={() => setSelectedProperty(null)}
            />
          )}

          <VideoModal
            isOpen={isVideoModalOpen}
            onClose={() => setIsVideoModalOpen(false)}
            youtubeId={selectedVideoUrl}
          />
        </section>
      </main>
    </div>
  );
}

export default Home;
