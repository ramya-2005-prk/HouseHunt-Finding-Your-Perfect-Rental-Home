import React from 'react';
import { Home, Plus, MessageSquare, DollarSign, Users, Eye, Calendar, TrendingUp } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';

interface OwnerDashboardProps {
  setCurrentView: (view: string) => void;
}

const OwnerDashboard: React.FC<OwnerDashboardProps> = ({ setCurrentView }) => {
  const { currentUser } = useAuth();
  const { properties, bookings } = useApp();

  const userProperties = properties.filter(p => p.ownerId === currentUser?.id);
  const userBookings = bookings.filter(b => b.ownerId === currentUser?.id);
  const totalRevenue = userProperties.reduce((sum, p) => sum + p.rent, 0);

  const stats = [
    { label: 'Total Properties', value: userProperties.length.toString(), icon: Home, color: 'bg-blue-100 text-blue-600' },
    { label: 'Active Listings', value: userProperties.filter(p => p.available).length.toString(), icon: Eye, color: 'bg-green-100 text-green-600' },
    { label: 'Applications', value: userBookings.length.toString(), icon: MessageSquare, color: 'bg-purple-100 text-purple-600' },
    { label: 'Monthly Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'bg-emerald-100 text-emerald-600' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!currentUser?.approved) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Under Review</h2>
          <p className="text-gray-600 mb-6">
            Your owner account is currently being reviewed by our admin team. 
            You'll receive an email notification once your account is approved and you can start listing properties.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>What's next?</strong><br />
              Our team typically reviews new owner accounts within 24-48 hours. 
              We'll verify your information and get back to you soon.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Property Owner Dashboard
          </h1>
          <p className="text-gray-600">Manage your properties and rental applications</p>
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
                  onClick={() => setCurrentView('add-property')}
                  className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group"
                >
                  <Plus className="h-8 w-8 text-gray-400 group-hover:text-blue-600 mr-3" />
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">Add New Property</div>
                    <div className="text-sm text-gray-600">List a new rental</div>
                  </div>
                </button>
                
                <button className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors group">
                  <TrendingUp className="h-8 w-8 text-gray-400 group-hover:text-green-600 mr-3" />
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">View Analytics</div>
                    <div className="text-sm text-gray-600">Property performance</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Your Properties */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Your Properties</h2>
                <button
                  onClick={() => setCurrentView('add-property')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Property
                </button>
              </div>
              
              {userProperties.length > 0 ? (
                <div className="space-y-4">
                  {userProperties.map(property => (
                    <div key={property.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900">{property.title}</h3>
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            property.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {property.available ? 'Available' : 'Occupied'}
                          </span>
                          <span className="text-lg font-bold text-blue-600">
                            ${property.rent.toLocaleString()}/mo
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{property.location}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          {property.bedrooms} bed • {property.bathrooms} bath • {property.area} sq ft
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setCurrentView(`property-${property.id}`)}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            View
                          </button>
                          <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Home className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No properties listed yet</p>
                  <button
                    onClick={() => setCurrentView('add-property')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add Your First Property
                  </button>
                </div>
              )}
            </div>

            {/* Recent Applications */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recent Applications</h2>
                <span className="text-sm text-gray-600">{userBookings.length} total</span>
              </div>
              
              {userBookings.length > 0 ? (
                <div className="space-y-4">
                  {userBookings.slice(0, 5).map(booking => {
                    const property = userProperties.find(p => p.id === booking.propertyId);
                    return (
                      <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-900">{booking.renterDetails.name}</h3>
                            <p className="text-sm text-gray-600">{property?.title}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{booking.message}</p>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>Applied on {booking.createdAt}</span>
                          <div className="space-x-2">
                            {booking.status === 'pending' && (
                              <>
                                <button className="text-green-600 hover:text-green-700 font-medium">
                                  Approve
                                </button>
                                <button className="text-red-600 hover:text-red-700 font-medium">
                                  Reject
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No applications yet</p>
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
                <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full mt-2">
                  Verified Owner
                </span>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Member Since</span>
                  <span className="font-medium">{currentUser?.createdAt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Properties</span>
                  <span className="font-medium">{userProperties.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Response Rate</span>
                  <span className="font-medium">95%</span>
                </div>
              </div>
            </div>

            {/* Performance Card */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">This Month</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Property Views</span>
                  <span className="font-bold text-gray-900">148</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Inquiries</span>
                  <span className="font-bold text-gray-900">23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Applications</span>
                  <span className="font-bold text-gray-900">{userBookings.length}</span>
                </div>
              </div>
            </div>

            {/* Tips Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Owner Tips</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Upload high-quality photos to attract more renters</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Respond to inquiries within 24 hours</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Keep property descriptions detailed and accurate</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;