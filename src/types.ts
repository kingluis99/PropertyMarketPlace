export type PropertyType = 'Terraced House' | 'Apartment' | 'Converted Loft' | 'Maisonette' | 'Detached Villa' | 'Period Cottage';

export type ListingType = 'sale' | 'rent';

export interface Property {
  id: string;
  title: string;
  address: string;
  area: string;
  postcode: string;
  listingType: ListingType;
  price: number; // e.g. 1650000 or 3200
  pricePeriod?: 'pcm' | 'pw'; // for rent
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  tenure: 'Freehold' | 'Share of Freehold' | 'Leasehold';
  epcRating: 'A' | 'B' | 'C' | 'D';
  councilTaxBand: 'Band A' | 'Band B' | 'Band C' | 'Band D' | 'Band E' | 'Band F' | 'Band G' | 'Band H';
  featured: boolean;
  images: string[];
  description: string;
  longDescription: string[];
  features: string[];
  floorplanUrl?: string;
  floorplanRooms: { room: string; dimensions: string; level: string }[];
  coordinates: { x: number; y: number }; // percentage on map (0-100)
  transport: { station: string; line: string; walkMinutes: number }[];
  agent: {
    name: string;
    role: string;
    phone: string;
    email: string;
    branch: string;
  };
}

export interface Neighbourhood {
  id: string;
  name: string;
  borough: string;
  tagline: string;
  description: string;
  image: string;
  character: string;
  transport: string[];
  schools: string[];
  highlights: string[];
  vibe: string;
  propertyTypes: string;
}

export interface FilterState {
  listingType: ListingType;
  location: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: string; // 'all' | '1' | '2' | '3' | '4+'
  propertyType: string; // 'all' | PropertyType
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest';
}

export interface ViewingRequest {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyAddress: string;
  date: string;
  timeSlot: string;
  name: string;
  email: string;
  phone: string;
  status: 'confirmed' | 'pending';
  notes?: string;
}

export interface ValuationData {
  postcode: string;
  propertyType: PropertyType;
  bedrooms: number;
  condition: 'Excellent' | 'Good' | 'Needs Modernisation';
  estimatedMin: number;
  estimatedMax: number;
}
