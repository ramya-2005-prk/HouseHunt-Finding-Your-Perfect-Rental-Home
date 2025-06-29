import React from 'react';
import { Users, Home, MessageSquare, Shield, TrendingUp, UserCheck, UserX, AlertTriangle, Clock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';

interface AdminDashboardProps {
  setCurrentView: (view: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ setCurrentView }) => {
  const { currentUser } = useAuth();
  const { properties, bookings } = useApp();

  // Mock admin data
  const totalUsers = 1250;
  const pendingOwners = 8;
  const totalBookings = bookings.length;
  const activeProperties = properties.filter(p => p.available).length;

  const stats = [
    { label: 'Total Users', value: totalUsers.toString(), icon: Users, color: 'bg-blue-100 text-blue-600' },
    { label: 'Active Properties', value: activeProperties.toString(), icon: Home, color: 'bg-green-100 text-green-600' },
    { label: 'Total Bookings', value: totalBookings.toString(), icon: MessageSquare, color: 'bg-purple-100 text-purple-600' },
    { label: 'Pending Reviews', value: pendingOwners.toString(), icon: Clock, color: 'bg-yellow-100 text-yellow-600' },
  ];

  const recentActivities = [
    { type: 'user_registered', message: 'New renter Alice Johnson registered', time: '2 hours ago', icon: UserCheck },
    { type: 'owner_pending', message: 'Property owner Bob Smith awaiting approval', time: '4 hours ago', icon: Clock },
    { type: 'booking_created', message: 'New booking for Downtown Apartment', time: '6 hours ago', icon: MessageSquare },
    { type: 'property_added', message: 'New property listed in Brooklyn', time: '1 day ago', icon: Home },
  ];

  const pendingOwnerRequests = [
    { id: '1', name: 'Sarah Wilson', email: 'sarah@example.com', date: '2024-01-28', properties: 3 },
    { id: '2', name: 'Mike Davis', email: 'mike@example.com', date: '2024-01-27', properties: 1 },
    { id: '3', name: 'Emma Thompson', email: 'emma@example.com', date: '2024-01-26', properties: 2 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Manage users, properties, and platform governance</p>
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
            {/* Pending Owner Approvals */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Pending Owner Approvals</h2>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                  {pendingOwnerRequests.length} pending
                </span>
              </div>
              
              {pendingOwnerRequests.length > 0 ? (
                <div className="space-y-4">
                  {pendingOwnerRequests.map(request => (
                    <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">{request.name}</h3>
                          <p className="text-sm text-gray-600">{request.email}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Applied {request.date}</p>
                          <p className="text-sm text-gray-600">{request.properties} properties to list</p>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
                          <UserCheck className="h-4 w-4 mr-2" />
                          Approve
                        </button>
                        <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center">
                          <UserX className="h-4 w-4 mr-2" />
                          Reject
                        </button>
                        <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <UserCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No pending approvals</p>
                </div>
              )}
            </div>

            {/* Recent Platform Activity */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Platform Activity</h2>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="bg-gray-100 p-2 rounded-lg">
                      <activity.icon className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900">{activity.message}</p>
                      <p className="text-sm text-gray-600">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Health */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">System Health</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-2">99.9%</div>
                  <div className="text-sm text-gray-600">Uptime</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-2">1.2s</div>
                  <div className="text-sm text-gray-600">Avg Response</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-2">0</div>
                  <div className="text-sm text-gray-600">Critical Issues</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Admin Profile */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-3">
                  {currentUser?.name.charAt(0)}
                </div>
                <h3 className="font-semibold text-gray-900">{currentUser?.name}</h3>
                <p className="text-sm text-gray-600">{currentUser?.email}</p>
                <span className="inline-block px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full mt-2">
                  Administrator
                </span>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Login</span>
                  <span className="font-medium">Today, 9:30 AM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Access Level</span>
                  <span className="font-medium">Full Access</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Users className="h-5 w-5 text-gray-600 mr-3" />
                  <span className="text-gray-900">Manage Users</span>
                </button>
                <button className="w-full flex items-center p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Home className="h-5 w-5 text-gray-600 mr-3" />
                  <span className="text-gray-900">Review Properties</span>
                </button>
                <button className="w-full flex items-center p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Shield className="h-5 w-5 text-gray-600 mr-3" />
                  <span className="text-gray-900">Security Settings</span>
                </button>
                <button className="w-full flex items-center p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <TrendingUp className="h-5 w-5 text-gray-600 mr-3" />
                  <span className="text-gray-900">View Analytics</span>
                </button>
              </div>
            </div>

            {/* Platform Stats */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Overview</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Total Revenue</span>
                  <span className="font-bold text-gray-900">$125,430</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Active Subscriptions</span>
                  <span className="font-bold text-gray-900">89</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Support Tickets</span>
                  <span className="font-bold text-gray-900">12</span>
                </div>
              </div>
            </div>

            {/* Alerts */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <div className="flex items-center mb-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
                <h3 className="text-lg font-semibold text-yellow-800">System Alerts</h3>
              </div>
              <div className="space-y-2 text-sm text-yellow-700">
                <p>• 8 owner accounts pending approval</p>
                <p>• Server maintenance scheduled for Sunday</p>
                <p>• New privacy policy requires user consent</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;