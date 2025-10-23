import { useState } from 'react';
import { useLocation } from 'wouter';
import { supabase } from '@/lib/supabase';

const NewPropertyForm = () => {
  const [, navigate] = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    category: 'casa',
    operation: 'venta',
    area: '',
    builded_area: '',
    currency: 'MXN',
    bathrooms: '',
    parking_spots: '',
    ceiling_height: '',
    dock_doors: '',
    air_conditioning: '0',
    office_area: '',
    maintenance_cost: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const propertyData = {
        ...formData,
        price: Number(formData.price) || 0,
        area: Number(formData.area) || 0,
        builded_area: Number(formData.builded_area) || 0,
        bathrooms: formData.bathrooms ? Number(formData.bathrooms) : null,
        parking_spots: formData.parking_spots ? Number(formData.parking_spots) : null,
        ceiling_height: formData.ceiling_height ? Number(formData.ceiling_height) : null,
        dock_doors: formData.dock_doors ? Number(formData.dock_doors) : null,
        air_conditioning: Number(formData.air_conditioning) || 0,
        office_area: formData.office_area ? Number(formData.office_area) : null,
        maintenance_cost: formData.maintenance_cost ? Number(formData.maintenance_cost) : null,
      };

      const { error } = await supabase
        .from('properties')
        .insert([propertyData]);

      if (error) throw error;
      
      navigate('/lotesynavesadmin/dashboard');
    } catch (err: any) {
      console.error('Error creating property:', err);
      setError(err.message || 'Error al crear la propiedad');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Nueva Propiedad</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Información Básica</h3>
              <p className="mt-1 text-sm text-gray-500">Información general de la propiedad.</p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2 space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Título *
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Descripción
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Categoría *
                  </label>
                  <select
                    id="category"
                    name="category"
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="casa">Casa</option>
                    <option value="departamento">Departamento</option>
                    <option value="local">Local Comercial</option>
                    <option value="oficina">Oficina</option>
                    <option value="terreno">Terreno</option>
                    <option value="bodega">Bodega</option>
                  </select>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="operation" className="block text-sm font-medium text-gray-700">
                    Operación *
                  </label>
                  <select
                    id="operation"
                    name="operation"
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    value={formData.operation}
                    onChange={handleChange}
                  >
                    <option value="venta">Venta</option>
                    <option value="renta">Renta</option>
                  </select>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Precio *
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      required
                      min="0"
                      step="0.01"
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={handleChange}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                      <select
                        name="currency"
                        className="focus:ring-blue-500 focus:border-blue-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                        value={formData.currency}
                        onChange={handleChange}
                      >
                        <option value="MXN">MXN</option>
                        <option value="USD">USD</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Ubicación *
                  </label>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="area" className="block text-sm font-medium text-gray-700">
                    Área Total (m²) *
                  </label>
                  <input
                    type="number"
                    name="area"
                    id="area"
                    required
                    min="0"
                    step="0.01"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    value={formData.area}
                    onChange={handleChange}
                  />
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="builded_area" className="block text-sm font-medium text-gray-700">
                    Área Construida (m²)
                  </label>
                  <input
                    type="number"
                    name="builded_area"
                    id="builded_area"
                    min="0"
                    step="0.01"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    value={formData.builded_area}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Características</h3>
              <p className="mt-1 text-sm text-gray-500">Detalles adicionales de la propiedad.</p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-2">
                  <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">
                    Baños
                  </label>
                  <input
                    type="number"
                    name="bathrooms"
                    id="bathrooms"
                    min="0"
                    step="0.5"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    value={formData.bathrooms}
                    onChange={handleChange}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="parking_spots" className="block text-sm font-medium text-gray-700">
                    Estacionamientos
                  </label>
                  <input
                    type="number"
                    name="parking_spots"
                    id="parking_spots"
                    min="0"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    value={formData.parking_spots}
                    onChange={handleChange}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="ceiling_height" className="block text-sm font-medium text-gray-700">
                    Altura de techo (m)
                  </label>
                  <input
                    type="number"
                    name="ceiling_height"
                    id="ceiling_height"
                    min="0"
                    step="0.1"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    value={formData.ceiling_height}
                    onChange={handleChange}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="dock_doors" className="block text-sm font-medium text-gray-700">
                    Número de muelles
                  </label>
                  <input
                    type="number"
                    name="dock_doors"
                    id="dock_doors"
                    min="0"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    value={formData.dock_doors}
                    onChange={handleChange}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="air_conditioning" className="block text-sm font-medium text-gray-700">
                    Aire Acondicionado
                  </label>
                  <select
                    id="air_conditioning"
                    name="air_conditioning"
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    value={formData.air_conditioning}
                    onChange={handleChange}
                  >
                    <option value="0">No</option>
                    <option value="1">Sí</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="office_area" className="block text-sm font-medium text-gray-700">
                    Área de oficina (m²)
                  </label>
                  <input
                    type="number"
                    name="office_area"
                    id="office_area"
                    min="0"
                    step="0.01"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    value={formData.office_area}
                    onChange={handleChange}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="maintenance_cost" className="block text-sm font-medium text-gray-700">
                    Costo de mantenimiento
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      name="maintenance_cost"
                      id="maintenance_cost"
                      min="0"
                      step="0.01"
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                      placeholder="0.00"
                      value={formData.maintenance_cost}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate('/lotesynavesadmin/dashboard')}
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Guardando...' : 'Guardar propiedad'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPropertyForm;
