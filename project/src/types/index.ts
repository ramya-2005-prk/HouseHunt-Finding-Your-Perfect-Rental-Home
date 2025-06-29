export interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  rent: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: 'apartment' | 'house' | 'room' | 'studio';
  amenities: string[];
  images: string[];
  ownerId: string;
  ownerName: string;
  ownerContact: string;
  available: boolean;
  createdAt: string;
  features: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'renter' | 'owner' | 'admin';
  approved: boolean;
  createdAt: string;
  phone?: string;
  bio?: string;
}

export interface Booking {
  id: string;
  propertyId: string;
  renterId: string;
  ownerId: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  message: string;
  createdAt: string;
  renterDetails: {
    name: string;
    email: string;
    phone: string;
    occupation: string;
    moveInDate: string;
  };
}

export interface SearchFilters {
  location: string;
  minRent: number;
  maxRent: number;
  bedrooms: number;
  propertyType: string;
  amenities: string[];
}