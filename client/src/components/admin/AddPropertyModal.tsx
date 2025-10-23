import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '../ui/button';
import { X } from 'lucide-react';

interface AddPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddPropertyModal({ isOpen, onClose, onSuccess }: AddPropertyModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [images, setImages] = useState<{ [key: string]: string }>({});
  const [newImageUrl, setNewImageUrl] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    category: 'industrial',
    operation: 'sale',
    area: '',
    builded_area: '',
    currency: 'MXN',
    bathrooms: '',
    parking_spots: '',
    ceiling_height: '',
    dock_doors: '',
    air_conditioning: '0',
    office_area: '',
    maintenance_cost: '',
    cover_image: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addImage = () => {
    if (newImageUrl.trim()) {
      const newKey = (Object.keys(images).length + 1).toString();
      setImages(prev => ({
        ...prev,
        [newKey]: newImageUrl.trim()
      }));
      
      // Set as cover image if it's the first one
      if (!formData.cover_image) {
        setFormData(prev => ({
          ...prev,
          cover_image: newImageUrl.trim()
        }));
      }
      
      setNewImageUrl('');
    }
  };

  const removeImage = (key: string) => {
    const newImages = { ...images };
    delete newImages[key];
    setImages(newImages);
    
    // If the removed image was the cover, update cover_image
    if (formData.cover_image === images[key]) {
      const remainingImages = Object.values(newImages);
      setFormData(prev => ({
        ...prev,
        cover_image: remainingImages[0] || ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // First, create the property
      const propertyData = {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price) || 0,
        location: formData.location,
        category: formData.category,
        operation: formData.operation,
        area: Number(formData.area) || 0,
        builded_area: Number(formData.builded_area) || 0,
        currency: formData.currency,
        bathrooms: formData.bathrooms ? Number(formData.bathrooms) : null,
        parking_spots: formData.parking_spots ? Number(formData.parking_spots) : null,
        ceiling_height: formData.ceiling_height ? Number(formData.ceiling_height) : null,
        dock_doors: formData.dock_doors ? Number(formData.dock_doors) : null,
        air_conditioning: Number(formData.air_conditioning) || 0,
        office_area: formData.office_area ? Number(formData.office_area) : null,
        maintenance_cost: formData.maintenance_cost ? Number(formData.maintenance_cost) : null,
      };

      // Insert property
      const { data: property, error: propertyError } = await supabase
        .from('properties')
        .insert([propertyData])
        .select()
        .single();

      if (propertyError) throw propertyError;

      // Then create the property assets with all images
      if (Object.keys(images).length > 0) {
        const { error: assetsError } = await supabase
          .from('properties_assets')
          .insert([{
            propertie_id: property.propertie_id,
            images: images,
            cover_image: formData.cover_image || Object.values(images)[0] || null
          }]);

        if (assetsError) throw assetsError;
      } else if (formData.cover_image) {
        // If there are no images but there is a cover image, still create the assets record
        const { error: assetsError } = await supabase
          .from('properties_assets')
          .insert([{
            propertie_id: property.propertie_id,
            images: {},
            cover_image: formData.cover_image
          }]);

        if (assetsError) throw assetsError;
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      console.error('Error creating property:', err);
      setError(err.message || 'Error al crear la propiedad');
    } finally {
      setLoading(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    // Only close if clicking directly on the overlay, not on the modal content
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-4 overflow-y-auto"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white rounded-lg w-full max-w-4xl my-4 sm:my-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fixed header */}
        <div className="top-0 bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex justify-between items-center z-10">
          <div>
            <h2 className="text-xl font-semibold text-white">Agregar Nueva Propiedad</h2>
            <p className="text-sm text-blue-100 mt-1">Completa los campos requeridos</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Basic Information */}
              <div className="space-y-4 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-lg font-medium">Información Básica</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Título *
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción
                  </label>
                  <textarea
                    name="description"
                    rows={3}
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Precio *
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="number"
                        name="price"
                        required
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={formData.price}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Moneda
                    </label>
                    <select
                      name="currency"
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={formData.currency}
                      onChange={handleChange}
                    >
                      <option value="MXN">MXN</option>
                      <option value="USD">USD</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ubicación *
                  </label>
                  <input
                    type="text"
                    name="location"
                    required
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Categoría
                    </label>
                    <select
                      name="category"
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={formData.category}
                      onChange={handleChange}
                    >
                      <option value="naves">Naves Industriales</option>
                      <option value="casas">Casas</option>
                      <option value="locales comerciales">Locales Comerciales</option>
                      <option value="oficinas">Oficinas</option>
                      <option value="terrenos">Terrenos</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Operación
                    </label>
                    <select
                      name="operation"
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={formData.operation}
                      onChange={handleChange}
                    >
                      <option value="sale">Venta</option>
                      <option value="rent">Renta</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div className="space-y-4 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-lg font-medium">Detalles de la Propiedad</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Área Total (m²)
                    </label>
                    <input
                      type="number"
                      name="area"
                      className=" flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={formData.area}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Área Construida (m²)
                    </label>
                    <input
                      type="number"
                      name="builded_area"
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={formData.builded_area}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Baños
                    </label>
                    <input
                      type="number"
                      name="bathrooms"
                      min="0"
                      step="0.5"
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={formData.bathrooms}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Estacionamientos
                    </label>
                    <input
                      type="number"
                      name="parking_spots"
                      min="0"
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={formData.parking_spots}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Altura de Techo (m)
                    </label>
                    <input
                      type="number"
                      name="ceiling_height"
                      step="0.1"
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={formData.ceiling_height}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Puertas de Dique
                    </label>
                    <input
                      type="number"
                      name="dock_doors"
                      min="0"
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={formData.dock_doors}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Aire Acondicionado
                    </label>
                    <select
                      name="air_conditioning"
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={formData.air_conditioning}
                      onChange={handleChange}
                    >
                      <option value="0">No</option>
                      <option value="1">Sí</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Área de Oficinas (m²)
                    </label>
                    <input
                      type="number"
                      name="office_area"
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={formData.office_area}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Costo de Mantenimiento
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      name="maintenance_cost"
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={formData.maintenance_cost}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Image URLs */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Imágenes de la Propiedad</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Agregar URL de Imagen
                </label>
                <div className="flex space-x-2">
                  <input
                    type="url"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="https://ejemplo.com/imagen.jpg"
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={addImage}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Agregar
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Ingresa la URL de la imagen y haz clic en Agregar
                </p>
              </div>

              {/* Image preview */}
              {Object.keys(images).length > 0 && (
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Imágenes agregadas
                    </label>
                    <span className="text-sm text-gray-500">
                      {Object.keys(images).length} {Object.keys(images).length === 1 ? 'imagen' : 'imágenes'}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    {Object.entries(images).map(([key, url]) => (
                      <div key={key} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md">
                        <div className="flex-shrink-0">
                          <img
                            src={url}
                            alt={`Imagen ${key}`}
                            className="h-12 w-12 rounded-md object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100';
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {url.length > 50 ? `${url.substring(0, 50)}...` : url}
                          </p>
                          <div className="flex items-center mt-1">
                            <input
                              id={`cover-${key}`}
                              name="cover_image"
                              type="radio"
                              checked={formData.cover_image === url}
                              onChange={() => {
                                setFormData(prev => ({
                                  ...prev,
                                  cover_image: url
                                }));
                              }}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <label 
                              htmlFor={`cover-${key}`}
                              className="ml-2 block text-sm text-gray-700 cursor-pointer"
                            >
                              Imagen principal
                            </label>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(key)}
                          className="text-red-600 hover:text-red-800"
                          title="Eliminar imagen"
                        >
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  {/* Cover Image Preview */}
                  {formData.cover_image && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Vista previa de la imagen principal
                      </label>
                      <div className="border rounded-md p-3 bg-white">
                        <img
                          src={formData.cover_image}
                          alt="Imagen principal"
                          className="max-h-48 mx-auto rounded-md"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Imagen+no+disponible';
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 bg-white p-4 -mx-6 -mb-6 rounded-b-lg">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="inline-flex items-center justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-75 disabled:cursor-not-allowed"
                disabled={loading || !formData.title || !formData.location}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Guardando...
                  </>
                ) : 'Guardar Propiedad'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
