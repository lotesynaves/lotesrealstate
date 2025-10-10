import { OperationType } from "@/components/PropertyCard";

export interface Property {
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
  description?: string;
  features: {
    // Basic features
    bathrooms?: number;
    parkingSpots?: number;
    ceilingHeight?: number;
    dockDoors?: number;
    
    // Additional features
    bedrooms?: number;
    airConditioning?: boolean;
    frontage?: number;
    meetingRooms?: number;
    workstations?: number;
    zoning?: string;
    levels?: number;
    pool?: boolean;
    garden?: boolean;
    furnished?: boolean;
    officeArea?: number;
    security?: boolean;
    mallLocation?: string;
    smartBuilding?: boolean;
    gymAccess?: boolean;
    view?: string;
    utilities?: boolean;
    access?: string;
    traffic?: string;
    beachFront?: boolean;
    rooftop?: boolean;
    temperatureControl?: boolean;
    receptionArea?: boolean;
    [key: string]: string | number | boolean | undefined;
  };
}

export interface PropertiesData {
  properties: Property[];
}
