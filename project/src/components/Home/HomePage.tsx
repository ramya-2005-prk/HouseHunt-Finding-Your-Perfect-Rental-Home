import React from 'react';
import { Search, MapPin, Shield, Users, Star, ArrowRight } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import PropertyCard from '../Properties/PropertyCard';

interface HomePageProps {
  setCurrentView: (view: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setCurrentView }) => {
  const { properties } = useApp();
  const featuredProperties = properties.slice(0, 3);

  const features = [
    {
      icon: Search,
      title: 'Smart Search',
      description: 'Find your perfect home with advanced filters and real-time results'
    },
    {
      icon: Shield,
      title: 'Verified Listings',
      description: 'All properties are verified by our team for authenticity and quality'
    },
    {
      icon: Users,
      title: 'Trusted Community',
      description: 'Connect with verified landlords and trusted property managers'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Properties Listed' },
    { number: '50,000+', label: 'Happy Renters' },
    { number: '2,500+', label: 'Trusted Landlords' },
    { number: '95%', label: 'Satisfaction Rate' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20 px-4">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Find Your Perfect
            <span className="block text-yellow-400">Rental Home</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Discover thousands of verified rental properties with transparent pricing and trusted landlords
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => setCurrentView('properties')}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors shadow-lg flex items-center"
            >
              <Search className="h-5 w-5 mr-2" />
              Start Searching
            </button>
            <button
              onClick={() => setCurrentView('register')}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors flex items-center"
            >
              <Users className="h-5 w-5 mr-2" />
              Join Today
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose HouseHunt?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We make finding and renting your next home simple, secure, and stress-free
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Properties
              </h2>
              <p className="text-xl text-gray-600">
                Handpicked properties from our premium collection
              </p>
            </div>
            <button
              onClick={() => setCurrentView('properties')}
              className="hidden md:flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              View All Properties
              <ArrowRight className="h-5 w-5 ml-2" />
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map(property => (
              <PropertyCard
                key={property.id}
                property={property}
                onViewDetails={() => setCurrentView(`property-${property.id}`)}
                onContact={() => setCurrentView(`contact-${property.id}`)}
              />
            ))}
          </div>
          
          <div className="text-center mt-12 md:hidden">
            <button
              onClick={() => setCurrentView('properties')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              View All Properties
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-blue-100">
              Join our growing community of happy renters and landlords
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-200 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your New Home?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Browse thousands of verified properties and connect with trusted landlords today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentView('properties')}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
            >
              Browse Properties
            </button>
            <button
              onClick={() => setCurrentView('register')}
              className="border-2 border-gray-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors"
            >
              List Your Property
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;