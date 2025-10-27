import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Property, OperationType } from '@/types/property';

export const useProperties = () => {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                // console.log('Iniciando consulta a Supabase...');
                setLoading(true);
                
                // 1. Verificar que supabase esté inicializado correctamente
                if (!supabase) {
                    throw new Error('Error: Supabase no está inicializado correctamente');
                }

                // 2. Hacer la consulta con más información de depuración
                // console.log('Consultando tabla "properties"...');
                // First, get the properties
                const { data: propertiesData, error: propertiesError } = await supabase
                    .from('properties')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (propertiesError) {
                    console.error('Error fetching properties:', propertiesError);
                    throw propertiesError;
                }

                // Then get the assets in a separate query
                const { data: assetsData, error: assetsError } = await supabase
                    .from('properties_assets')
                    .select('propertie_id, cover_image, images');
                // console.log('Assets data:', assetsData);
                if (assetsError) {
                    console.error('Error fetching properties_assets:', assetsError);
                    throw assetsError;
                }

                // Combine the data
                const data = propertiesData.map(prop => ({
                    ...prop,
                    properties_assets: [assetsData.find(asset => asset.propertie_id === prop.propertie_id)].filter(Boolean) || []
                }));

                // console.log('Datos de propiedades cargados:', { propertiesCount: data.length });

                if (!data || data.length === 0) {
                    console.warn('La consulta no devolvió resultados. Verifica que la tabla "properties" tenga datos.');
                    setProperties([]);
                    setLoading(false);
                    return;
                }

                // 3. Mapear los datos con mejor manejo de errores
                const typedProperties: Property[] = data.map((prop: any) => {
                    try {
                        // console.log('Procesando propiedad:', prop);
                        // Get the cover image
                        const coverImage = prop.properties_assets?.[0]?.cover_image || prop.coverImage || '';
                        
                        // Process the images array from JSON format
                        let images: string[] = [];
                        const imagesData = prop.properties_assets?.[0]?.images;
                        
                        if (imagesData) {
                            try {
                                // If it's a string, parse it as JSON
                                const dataToProcess = typeof imagesData === 'string' ? JSON.parse(imagesData) : imagesData;
                                
                                // Handle different possible structures
                                if (Array.isArray(dataToProcess)) {
                                    // If it's already an array of strings
                                    images = dataToProcess.filter((item): item is string => 
                                        typeof item === 'string' && item.trim() !== ''
                                    );
                                } else if (typeof dataToProcess === 'object' && dataToProcess !== null) {
                                    // If it's an object with numeric keys (like from a form upload)
                                    images = Object.values(dataToProcess).filter((url): url is string => 
                                        typeof url === 'string' && url.trim() !== ''
                                    );
                                }
                                
                                // console.log('Processed images:', images);
                            } catch (e) {
                                console.error('Error processing images data:', e, 'Raw data:', imagesData);
                            }
                        }
                        
                        // Always include the cover image if it exists and isn't already in the images array
                        if (coverImage && !images.includes(coverImage)) {
                            images.unshift(coverImage); // Add cover image at the beginning
                        }
                        
                        return {
                            id: prop.propertie_id?.toString() || '',
                            title: prop.title || 'Sin título',
                            description: prop.description || '',
                            category: prop.category || 'other',
                            operation: (prop.operation as OperationType) || 'sale',
                            coverImage: coverImage || prop.cover_image || '/placeholder-property.jpg',
                            images: images,
                            location: prop.location || 'Ubicación no especificada',
                            area: prop.area || 0,
                            price: prop.price || 0,
                            currency: prop.currency || 'USD',
                            hasVideos: prop.has_videos || false,
                            features: {
                                bathrooms: prop.bathrooms || 0,
                                parkingSpots: prop.parking_spots || 0,
                                ceilingHeight: prop.ceiling_height || 0,
                                dockDoors: prop.dock_doors || 0,
                                airConditioning: Boolean(prop.air_conditioning),
                                officeArea: prop.office_area || 0,
                                buildedArea: prop.builded_area || 0,
                                maintenanceCost: prop.maintenance_cost || 0,
                            }
                        };
                    } catch (mapError) {
                        console.error('Error mapeando la propiedad:', prop, mapError);
                        return null;
                    }
                }).filter(Boolean) as Property[]; // Filtrar cualquier null del mapeo

                // console.log('Propiedades mapeadas:', typedProperties);
                setProperties(typedProperties);
                
            } catch (err) {
                console.error('Error al obtener propiedades:', {
                    error: err,
                    message: err instanceof Error ? err.message : 'Error desconocido',
                    supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
                    hasAnonKey: !!import.meta.env.VITE_SUPABASE_ANON_KEY,
                });
                setError('No se pudieron cargar las propiedades. Por favor, verifica la consola para más detalles.');
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
        
        // Limpieza
        return () => {
            // Cualquier limpieza necesaria
        };
    }, []);

    return { properties, loading, error };
};

export default useProperties;
