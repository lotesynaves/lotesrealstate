export interface Property extends Record<string, any> {
  propertie_id: string | number;
  title: string;
  description: string;
  price: number;
  location: string;
  category: string;
  operation: string;
  area: number;
  builded_area: number | null;
  currency: string;
  bathrooms: number | null;
  parking_spots: number | null;
  ceiling_height: number | null;
  dock_doors: number | null;
  air_conditioning: number;
  office_area: number | null;
  maintenance_cost: number | null;
  properties_assets?: Array<{
    cover_image: string | null;
  }>;
  cover_image?: string | null;
  assets?: {
    images: { [key: string]: string };
    cover_image: string;
  };
}

export interface PropertyAsset {
  id?: number;
  propertie_id: number;
  image_url: string;
  is_cover?: boolean;
  created_at?: string;
}

export interface PropertyFormData extends Omit<Property, 'propertie_id' | 'properties_assets' | 'cover_image'> {
  // Add any form-specific fields if needed
}
