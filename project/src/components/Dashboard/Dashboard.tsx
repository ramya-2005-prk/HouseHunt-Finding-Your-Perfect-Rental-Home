import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import RenterDashboard from './RenterDashboard';
import OwnerDashboard from './OwnerDashboard';
import AdminDashboard from './AdminDashboard';

interface DashboardProps {
  setCurrentView: (view: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setCurrentView }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">Please log in to access your dashboard</p>
          <button
            onClick={() => setCurrentView('login')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  switch (currentUser.role) {
    case 'renter':
      return <RenterDashboard setCurrentView={setCurrentView} />;
    case 'owner':
      return <OwnerDashboard setCurrentView={setCurrentView} />;
    case 'admin':
      return <AdminDashboard setCurrentView={setCurrentView} />;
    default:
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Invalid User Role</h2>
            <p className="text-gray-600">Please contact support for assistance</p>
          </div>
        </div>
      );
  }
};

export default Dashboard;