import React from 'react';
import { Search, Heart, MessageSquare, Calendar, Home, MapPin, Star, Clock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';

interface RenterDashboardProps {
  setCurrentView: (view: string) => void;
}

const RenterDashboard: React.FC<RenterDashboardProps> = ({ setCurrentView }) => {
  const { currentUser } = useAuth();
  const { bookings, properties } = useApp();

  const userBookings = bookings.filter(b => b.renterId === currentUser?.id);
  const recentProperties = properties.slice(0, 3);

  const stats = [
    { label: 'Properties Viewed', value: '12', icon: Search, color: 'bg-blue-100 text-blue-600' },
    { label: 'Saved Properties', value: '5', icon: Heart, color: 'bg-red-100 text-red-600' },
    { label: 'Applications', value: userBookings.length.toString(), icon: MessageSquare, color: 'bg-green-100 text-green-600' },
    { label: 'Tours Scheduled', value: '2', icon: Calendar, color: 'bg-purple-100 text-purple-600' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {currentUser?.name}!
          </h1>
          <p className="text-gray-600">Find your perfect home and manage your rental journey</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <button
                  onClick={() => setCurrentView('properties')}
                  className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group"
                >
                  <Search className="h-8 w-8 text-gray-400 group-hover:text-blue-600 mr-3" />
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">Browse Properties</div>
                    <div className="text-sm text-gray-600">Find your next home</div>
                  </div>
                </button>
                
                <button className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors group">
                  <Calendar className="h-8 w-8 text-gray-400 group-hover:text-green-600 mr-3" />
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">Schedule Tour</div>
                    <div className="text-sm text-gray-600">Visit properties</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Recent Applications */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Your Applications</h2>
                <span className="text-sm text-gray-600">{userBookings.length} total</span>
              </div>
              
              {userBookings.length > 0 ? (
                <div className="space-y-4">
                  {userBookings.map(booking => {
                    const property = properties.find(p => p.id === booking.propertyId);
                    return (
                      <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-gray-900">{property?.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600 text-sm mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{property?.location}</span>
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Applied on {booking.createdAt}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No applications yet</p>
                  <button
                    onClick={() => setCurrentView('properties')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Browse Properties
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-3">
                  {currentUser?.name.charAt(0)}
                </div>
                <h3 className="font-semibold text-gray-900">{currentUser?.name}</h3>
                <p className="text-sm text-gray-600">{currentUser?.email}</p>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Member Since</span>
                  <span className="font-medium">{currentUser?.createdAt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Type</span>
                  <span className="font-medium capitalize">{currentUser?.role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className="text-green-600 font-medium">Verified</span>
                </div>
              </div>
            </div>

            {/* Recommended Properties */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended for You</h3>
              <div className="space-y-4">
                {recentProperties.map(property => (
                  <div key={property.id} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                       onClick={() => setCurrentView(`property-${property.id}`)}>
                    <div className="flex items-center space-x-3">
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{property.title}</p>
                        <p className="text-sm text-gray-600">${property.rent.toLocaleString()}/mo</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setCurrentView('properties')}
                className="w-full mt-4 text-blue-600 text-sm font-medium hover:text-blue-700"
              >
                View All Properties →
              </button>
            </div>

            {/* Tips Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Rental Tips</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Prepare necessary documents in advance</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Schedule property tours during different times</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Ask about utility costs and neighborhood</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenterDashboard;