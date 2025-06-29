import React, { createContext, useContext, useState } from 'react';
import { Property, Booking, SearchFilters } from '../types';

interface AppContextType {
  properties: Property[];
  bookings: Booking[];
  searchFilters: SearchFilters;
  addProperty: (property: Omit<Property, 'id' | 'createdAt'>) => void;
  updateProperty: (id: string, updates: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => void;
  updateBooking: (id: string, updates: Partial<Booking>) => void;
  updateSearchFilters: (filters: Partial<SearchFilters>) => void;
  getFilteredProperties: () => Property[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Mock properties data
const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Downtown Apartment',
    description: 'Beautiful 2-bedroom apartment in the heart of downtown with stunning city views. Recently renovated with modern amenities and stylish furnishings.',
    location: 'Downtown, New York',
    rent: 2500,
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    type: 'apartment',
    amenities: ['WiFi', 'Parking', 'Gym', 'Pool', 'Laundry', 'Air Conditioning'],
    images: [
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    ownerId: '2',
    ownerName: 'Bob Smith',
    ownerContact: 'bob@example.com',
    available: true,
    createdAt: '2024-01-15',
    features: ['City View', 'Recently Renovated', 'Pet Friendly']
  },
  {
    id: '2',
    title: 'Cozy Suburban House',
    description: 'Charming 3-bedroom house in a quiet suburban neighborhood. Perfect for families with a large backyard and excellent school district.',
    location: 'Suburbia, California',
    rent: 3200,
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    type: 'house',
    amenities: ['WiFi', 'Parking', 'Garden', 'Garage', 'Air Conditioning'],
    images: [
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    ownerId: '2',
    ownerName: 'Bob Smith',
    ownerContact: 'bob@example.com',
    available: true,
    createdAt: '2024-01-20',
    features: ['Large Backyard', 'Family Friendly', 'Near Schools']
  },
  {
    id: '3',
    title: 'Luxury Studio Loft',
    description: 'Sophisticated studio loft in trendy neighborhood. High ceilings, exposed brick, and premium finishes throughout.',
    location: 'Brooklyn, New York',
    rent: 1800,
    bedrooms: 1,
    bathrooms: 1,
    area: 800,
    type: 'studio',
    amenities: ['WiFi', 'Gym', 'Rooftop', 'Laundry', 'Air Conditioning'],
    images: [
      'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    ownerId: '2',
    ownerName: 'Bob Smith',
    ownerContact: 'bob@example.com',
    available: true,
    createdAt: '2024-01-25',
    features: ['High Ceilings', 'Exposed Brick', 'Trendy Area']
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    location: '',
    minRent: 0,
    maxRent: 10000,
    bedrooms: 0,
    propertyType: '',
    amenities: []
  });

  const addProperty = (propertyData: Omit<Property, 'id' | 'createdAt'>) => {
    const newProperty: Property = {
      ...propertyData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProperties(prev => [...prev, newProperty]);
  };

  const updateProperty = (id: string, updates: Partial<Property>) => {
    setProperties(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProperty = (id: string) => {
    setProperties(prev => prev.filter(p => p.id !== id));
  };

  const addBooking = (bookingData: Omit<Booking, 'id' | 'createdAt'>) => {
    const newBooking: Booking = {
      ...bookingData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setBookings(prev => [...prev, newBooking]);
  };

  const updateBooking = (id: string, updates: Partial<Booking>) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  const updateSearchFilters = (filters: Partial<SearchFilters>) => {
    setSearchFilters(prev => ({ ...prev, ...filters }));
  };

  const getFilteredProperties = () => {
    return properties.filter(property => {
      const matchesLocation = !searchFilters.location || 
        property.location.toLowerCase().includes(searchFilters.location.toLowerCase());
      const matchesRent = property.rent >= searchFilters.minRent && 
        property.rent <= searchFilters.maxRent;
      const matchesBedrooms = searchFilters.bedrooms === 0 || 
        property.bedrooms >= searchFilters.bedrooms;
      const matchesType = !searchFilters.propertyType || 
        property.type === searchFilters.propertyType;
      const matchesAmenities = searchFilters.amenities.length === 0 ||
        searchFilters.amenities.every(amenity => property.amenities.includes(amenity));

      return matchesLocation && matchesRent && matchesBedrooms && matchesType && matchesAmenities;
    });
  };

  const value = {
    properties,
    bookings,
    searchFilters,
    addProperty,
    updateProperty,
    deleteProperty,
    addBooking,
    updateBooking,
    updateSearchFilters,
    getFilteredProperties
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};