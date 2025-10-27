import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { supabase } from '@/lib/supabase';
import { Plus, Trash2 } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import AddPropertyModal from '@/components/admin/AddPropertyModal';
import EditPropertyModal from '@/components/admin/EditPropertyModal';
import { Property } from '../../../../shared/types';

const PropertiesList = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [propertyToDelete, setPropertyToDelete] = useState<Property | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // When editing a property
  const handleEditProperty = (property: Property) => {
    setSelectedProperty(property);
    setIsEditModalOpen(true);
  };

  // Handle successful property update
  const handleUpdateSuccess = () => {
    fetchProperties(); // Refresh the properties list
    setIsEditModalOpen(false); // Close the edit modal
  };

  // Handle property deletion
  const handleDeleteProperty = async () => {
    if (!propertyToDelete) return;
    
    try {
      setLoading(true);
      
      // First, delete the property assets if they exist
      const { error: assetsError } = await supabase
        .from('properties_assets')
        .delete()
        .eq('propertie_id', propertyToDelete.propertie_id);
      
      if (assetsError) throw assetsError;
      
      // Then delete the property
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('propertie_id', propertyToDelete.propertie_id);
      
      if (error) throw error;
      
      // Refresh the properties list
      await fetchProperties();
      
    } catch (error) {
      console.error('Error deleting property:', error);
      setError('Error al eliminar la propiedad');
    } finally {
      setLoading(false);
      setIsDeleteDialogOpen(false);
      setPropertyToDelete(null);
    }
  };

  const fetchProperties = async () => {
    try {
      setLoading(true);
      
      // Get all properties
      const { data: properties, error: propertiesError } = await supabase
        .from('properties')
        .select('*')
        .order('propertie_id', { ascending: false });

      if (propertiesError) throw propertiesError;
      if (!properties || properties.length === 0) {
        setProperties([]);
        return;
      }

      // Get all assets
      const { data: assets, error: assetsError } = await supabase
        .from('properties_assets')
        .select('*');
      
      if (assetsError) throw assetsError;
      
      // Transform the data to match the Property type
      const transformedData = properties.map(property => {
        const propertyAssets = assets?.filter(asset => asset.propertie_id === property.propertie_id) || [];
        
        // Debug log
        // console.log('Property:', property.propertie_id, 'Assets:', propertyAssets);
        
        return {
          ...property,
          properties_assets: propertyAssets,
          description: property.description || '',
          area: property.area || 0,
          builded_area: property.builded_area || null,
          currency: property.currency || 'MXN',
          bathrooms: property.bathrooms || null,
          parking_spots: property.parking_spots || null,
          ceiling_height: property.ceiling_height || null,
          dock_doors: property.dock_doors || null,
          air_conditioning: property.air_conditioning || 0,
          office_area: property.office_area || null,
          maintenance_cost: property.maintenance_cost || null,
          propertie_id: property.propertie_id.toString(),
        };
      });
      
      setProperties(transformedData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error al cargar las propiedades: {error}
      </div>
    );
  }

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Propiedades</h1>
          <p className="mt-2 text-sm text-gray-700">
            Lista de propiedades registradas en el sistema.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Agregar propiedad
          </button>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Imagen
                    </th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Título
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Ubicación
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Categoría
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Operación
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
                      Precio
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Editar</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {properties.map((property) => (
                    <tr key={property.propertie_id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6">
                        {(() => {
                          // Debug log
                          // console.log('Property assets:', {
                          //   id: property.propertie_id,
                          //   hasAssets: !!property.properties_assets,
                          //   assets: property.properties_assets,
                          //   firstAsset: property.properties_assets?.[0],
                          //   coverImage: property.properties_assets?.[0]?.cover_image
                          // });
                          
                          const imageUrl = property.properties_assets?.[0]?.cover_image;
                          
                          return imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={property.title}
                              className="h-12 w-12 rounded-md object-cover"
                            />
                          ) : (
                            <div className="h-12 w-12 rounded-md bg-gray-200 flex items-center justify-center">
                              <span className="text-xs text-gray-500">Sin imagen</span>
                            </div>
                          );
                        })()}
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {property.title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {property.location}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 capitalize">
                        {property.category}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 capitalize">
                        {property.operation}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-right text-sm text-gray-500">
                        ${property.price?.toLocaleString()?? '??'}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <div className="flex space-x-4">
                          <button
                            onClick={() => handleEditProperty(property)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => {
                              setPropertyToDelete(property);
                              setIsDeleteDialogOpen(true);
                            }}
                            className="text-red-600 hover:text-red-900"
                            title="Eliminar propiedad"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Add Property Modal */}
      <AddPropertyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setIsModalOpen(false);
          fetchProperties();
        }}
      />
      <EditPropertyModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedProperty(null);
        }}
        onSuccess={handleUpdateSuccess}
        property={selectedProperty}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-6">
            <Dialog.Title className="text-lg font-medium text-gray-900">
              Confirmar eliminación
            </Dialog.Title>
            <Dialog.Description className="mt-2 text-sm text-gray-600">
              ¿Estás seguro de que deseas eliminar la propiedad "{propertyToDelete?.title}"? Esta acción no se puede deshacer.
            </Dialog.Description>

            <div className="mt-4 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setPropertyToDelete(null);
                  setIsDeleteDialogOpen(false);
                }}
                className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleDeleteProperty}
                className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                disabled={loading}
              >
                {loading ? 'Eliminando...' : 'Eliminar'}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default PropertiesList;
