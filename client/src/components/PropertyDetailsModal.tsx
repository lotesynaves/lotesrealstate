import { X } from 'lucide-react';
import { Button } from './ui/button';
import { useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'wouter';
import { Property } from "@/types/property";

interface PropertyDetailsModalProps {
  property: Property | null;
  onClose: () => void;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export default function PropertyDetailsModal({ property, onClose }: PropertyDetailsModalProps) {
  const [location, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Handle browser back/forward and URL updates
  useEffect(() => {
    if (property) {
      // Update URL with propertyId when modal is opened
      const params = new URLSearchParams(searchParams);
      params.set('propertyId', property.id);
      setLocation(`?${params.toString()}`, { replace: true });
    }
    
    // Handle back button
    const handlePopState = () => {
      const currentParams = new URLSearchParams(window.location.search);
      if (!currentParams.has('propertyId')) {
        onClose();
      }
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [property, searchParams, onClose, setLocation]);

  // Enhanced close handler that also updates URL
  const handleClose = useCallback(() => {
    // Remove propertyId from URL
    const params = new URLSearchParams(searchParams);
    params.delete('propertyId');
    setLocation(`?${params.toString()}`, { replace: true });
    onClose();
  }, [onClose, searchParams, setLocation]);

  if (!property) return null;

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    // Handle click outside to close modal
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleContactClick = () => {
    const currentUrl = new URL(window.location.origin + location);
    currentUrl.searchParams.set('propertyId', property.id);
    
    const message = `¡Hola! Estoy interesad@ en la propiedad "${property.title}" (ID: ${property.id}).\n\n${currentUrl.toString()}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={handleClose}
    >
      <div 
        ref={modalRef}
        className="bg-white dark:bg-gray-900 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white dark:bg-gray-900 p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{property.title}</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="px-4 py-6 sm:px-6 dark:bg-gray-900">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            {/* Main Image */}
            <img
              src={property.coverImage}
              alt={property.title}
              className="w-full h-96 object-cover dark:border-gray-700 rounded-t-lg"
            />
          </div>

          {/* Spacer between image and content */}
          <div className="h-6"></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                  {property.operation === 'venta' ? 'En Venta' : 'En Renta'}
                </span>
                <span className="text-gray-600 dark:text-gray-300">{property.location}</span>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {formatCurrency(property.price)} {property.operation === 'renta' ? '/mes' : ''}
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Área</p>
                  <p className="font-medium dark:text-gray-200">{property.area} m²</p>
                </div>
                {property.features.bedrooms && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Recámaras</p>
                    <p className="font-medium dark:text-gray-200">{property.features.bedrooms}</p>
                  </div>
                )}
                {property.features.bathrooms && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Baños</p>
                    <p className="font-medium dark:text-gray-200">{property.features.bathrooms}</p>
                  </div>
                )}
                {property.features.parkingSpots && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Estacionamientos</p>
                    <p className="font-medium dark:text-gray-200">{property.features.parkingSpots}</p>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2 dark:text-gray-100">Descripción</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  {property.description || 'No hay descripción disponible para esta propiedad.'}
                </p>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2 dark:text-gray-100">Características</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                  {Object.entries(property.features).map(([key, value]) => {
                    if (value === undefined || value === null) return null;

                    const featureLabels: Record<string, string> = {
                      bathrooms: 'Baños',
                      parkingSpots: 'Estacionamientos',
                      ceilingHeight: 'Altura de techo',
                      dockDoors: 'Puertas de andén',
                      airConditioning: 'Aire acondicionado',
                      frontage: 'Frente',
                      meetingRooms: 'Salas de juntas',
                      workstations: 'Estaciones de trabajo',
                      zoning: 'Zonificación',
                      levels: 'Niveles',
                      pool: 'Alberca',
                      garden: 'Jardín',
                      furnished: 'Amueblado',
                      officeArea: 'Área de oficinas',
                      security: 'Seguridad',
                      mallLocation: 'Ubicación en plaza',
                      smartBuilding: 'Edificio inteligente',
                      gymAccess: 'Acceso a gimnasio',
                      view: 'Vista',
                      utilities: 'Servicios',
                      access: 'Acceso',
                      traffic: 'Tráfico',
                      beachFront: 'Frente a la playa',
                      temperatureControl: 'Control de temperatura',
                      receptionArea: 'Área de recepción'
                    };

                    return (
                      <div key={key} className="flex items-center gap-1 sm:gap-2 bg-gray-50 dark:bg-gray-800 p-1.5 sm:p-2 rounded-md text-sm sm:text-base">
                        <span className="text-green-600 dark:text-green-400">•</span>
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          <span className="font-medium">{featureLabels[key] || key}:</span> {typeof value === 'boolean' ? (value ? 'Sí' : 'No') : value}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Column - Contact */}
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <h3 className="text-lg font-semibold mb-3 dark:text-white">Contactar al agente</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  ¿Te interesa esta propiedad? Contáctanos para más información o agendar una visita.
                </p>
                <Button
                  onClick={handleContactClick}
                  className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.498 14.382v3.3a1 1 0 01-1.09.998c-5.19-.28-9.322-4.413-9.59-9.452a.999.999 0 01.997-1.09h3.2a1 1 0 011 1v1.5a1 1 0 01-1 1c-.087 0-.173.01-.258.03a7.2 7.2 0 006.258 6.258 1 1 0 01.03.258v1.5a1 1 0 01-1 1z" />
                  </svg>
                  Contactar por WhatsApp
                </Button>
                <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  <p className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    contacto@industrialrealtyhub.com
                  </p>
                  <p className="flex items-center gap-2 mt-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +52 55 1234 5678
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <h4 className="font-semibold mb-3 dark:text-white">Compartir propiedad</h4>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                    Facebook
                  </Button>
                  <Button variant="outline" size="sm" className="dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                    Twitter
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      // Aquí podrías agregar un toast de confirmación
                    }}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    Copiar enlace
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
