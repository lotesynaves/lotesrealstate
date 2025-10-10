import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Warehouse, HomeIcon, Store, Building, LandPlot } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import HeroSection from "@/components/HeroSection";
import SearchBar from "@/components/SearchBar";
import PropertyCard, { OperationType } from "@/components/PropertyCard";
import CategoryTab from "@/components/CategoryTab";
import BlogPostCard from "@/components/BlogPostCard";
import VideoModal from "@/components/VideoModal";
import PropertyDetailsModal from "@/components/PropertyDetailsModal";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

// Import data
import propertiesData from "@/data/properties.json";
import blogPostsData from "@/data/blogPosts.json";
import categoriesData from "@/data/categories.json";
import textsData from "@/data/texts.json";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

// Types
interface PropertyFeatures {
  bathrooms?: number;
  parkingSpots?: number;
  ceilingHeight?: number;
  dockDoors?: number;
  airConditioning?: boolean;
  frontage?: number;
  meetingRooms?: number;
  workstations?: number;
  zoning?: string;
  levels?: number;
  [key: string]: string | number | boolean | undefined; // For any additional properties
}

interface Property {
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
  features: PropertyFeatures;
}

// Type guard to check if operation is valid
function isOperationType(value: string): value is OperationType {
  return value === 'renta' || value === 'venta';
}

// Process and validate properties data
const allProperties = [...propertiesData.properties, ...(propertiesData.properties_added || [])];

const typedProperties: Property[] = allProperties.map(prop => {
  // Create a new features object with all possible properties
  const features: PropertyFeatures = {
    // Spread all existing features first
    ...prop.features,
    // Ensure required features have default values if not provided
    bathrooms: prop.features?.bathrooms ?? 0,
    parkingSpots: prop.features?.parkingSpots ?? 0,
    ceilingHeight: prop.features?.ceilingHeight ?? 0,
    dockDoors: prop.features?.dockDoors ?? 0,
  };

  return {
    ...prop,
    operation: isOperationType(prop.operation) ? prop.operation : 'venta',
    features
  };
});

// Extraer datos de los archivos JSON
const mockProperties = allProperties;
const { blogPosts: mockBlogPosts } = blogPostsData;
const { categories: categoriesList } = categoriesData;
const { hero, featuredProperties, blog, contact, buttons } = textsData;

// Mapear íconos de las categorías
const iconComponents: Record<string, any> = {
  Warehouse,
  Home: HomeIcon,
  Store,
  Building,
  LandPlot
};

// Añadir componentes de íconos a las categorías
const categories = categoriesList.map(cat => ({
  ...cat,
  icon: iconComponents[cat.icon] || Warehouse,
  count: cat.key === 'all'
    ? mockProperties.length
    : mockProperties.filter(p =>
      p.category.toLowerCase().includes(cat.key.toLowerCase())
    ).length
}));

const Home = () => {
  const [location, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  // Check for propertyId in URL when component mounts
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const propertyId = params.get('propertyId');
    
    if (propertyId) {
      const property = typedProperties.find(p => p.id === propertyId);
      if (property) {
        setSelectedProperty(property);
      }
    }
  }, []);
  
  // Reset search params when changing category
  const handleCategorySelect = (categoryKey: string) => {
    setSelectedCategory(categoryKey === 'all' ? 'all' : categoryKey);
    // Clear all search params when changing categories to avoid conflicts
    setSearchParams({
      location: '',
      category: '',
      operation: ''
    });
  };
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [searchParams, setSearchParams] = useState({
    location: '',
    category: '',
    operation: ''
  });

  const handleSearch = (params: { location: string; category: string; operation: string }) => {
    // Only update search params if at least one field has a value
    if (params.location || params.category || params.operation) {
      setSearchParams({
        location: params.location || '',
        category: params.category || '',
        operation: params.operation || ''
      });
      // Reset selected category when using search to avoid conflicting filters
      setSelectedCategory('all');
    }
  };

  // Helper function to normalize category names for comparison
  const normalizeCategory = (category: string) => {
    return category.toLowerCase().replace(/\s+/g, '');
  };

  // Filter properties based on search params and selected category
  const filteredProperties = typedProperties.filter(property => {
    // Check search parameters
    const matchesLocation = searchParams.location === '' ||
      property.location.toLowerCase().includes(searchParams.location.toLowerCase().trim());
      
    // Only apply category filter from search if it's not empty
    const matchesCategoryFromSearch = searchParams.category === '' ||
      normalizeCategory(property.category).includes(normalizeCategory(searchParams.category));
      
    const matchesOperation = searchParams.operation === '' ||
      property.operation === searchParams.operation.trim();

    // Check selected category tab - this is the main category filter
    const matchesSelectedCategory = selectedCategory === 'all' ||
      normalizeCategory(property.category).includes(selectedCategory);

    // Combine all conditions - all must be true
    return (
      matchesLocation &&
      matchesCategoryFromSearch &&
      matchesOperation &&
      matchesSelectedCategory
    );
  });

  return (
    <div className="min-h-screen flex flex-col">


      <HeroSection onPlayVideo={() => setVideoModalOpen(true)} />


      <section id="propiedades" className="py-12 px-4 container mx-auto">


        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6">Propiedades Destacadas</h2>
          <SearchBar onSearch={handleSearch} onClearFilters={() => setSearchParams({ location: '', category: '', operation: '' })} />
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
                      <span className={`flex items-center justify-center h-5 min-w-[24px] px-1.5 rounded-full text-xs font-medium ${
                        isActive 
                          ? 'bg-blue-500/90 text-white' 
                          : 'bg-gray-100 dark:bg-gray-700/80 text-gray-600 dark:text-gray-300'
                      }`}>
                        {category.count}
                      </span>
                    </div>

                    {/* Desktop View - Full card with icon */}
                    <div className="hidden sm:flex flex-col items-center justify-center w-full h-full px-2">
                      <Icon 
                        className={`h-8 w-8 mb-2.5 transition-colors duration-200 ${
                          isActive 
                            ? 'text-white' 
                            : 'text-blue-600 dark:text-blue-400'
                        }`} 
                      />
                      <span className="text-sm font-medium text-center leading-tight">{category.label}</span>
                      <span className={`text-xs mt-1.5 ${
                        isActive 
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
      </section>

      {/* Contact Section */}
      <section id="contacto" className="relative py-16 bg-gray-50 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
        {/* Background pattern - only visible in dark mode */}
        <div className="absolute inset-0 hidden dark:block">
          <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="dark:bg-gray-800/70 dark:backdrop-blur-sm dark:rounded-2xl dark:shadow-2xl dark:border dark:border-gray-700/50 dark:overflow-hidden">
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
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        youtubeId="dQw4w9WgXcQ"
        title="Conoce Nuestras Propiedades"
      />


    </div>
  );
}

export default Home;
