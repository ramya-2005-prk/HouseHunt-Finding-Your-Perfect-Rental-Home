import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import Header from './components/Layout/Header';
import HomePage from './components/Home/HomePage';
import PropertyList from './components/Properties/PropertyList';
import PropertyDetail from './components/Properties/PropertyDetail';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import Dashboard from './components/Dashboard/Dashboard';
import AddProperty from './components/Properties/AddProperty';
import ContactForm from './components/Contact/ContactForm';

function App() {
  const [currentView, setCurrentView] = useState('home');

  const renderCurrentView = () => {
    // Handle property detail views
    if (currentView.startsWith('property-')) {
      const propertyId = currentView.replace('property-', '');
      return <PropertyDetail propertyId={propertyId} setCurrentView={setCurrentView} />;
    }

    // Handle contact form views
    if (currentView.startsWith('contact-')) {
      const propertyId = currentView.replace('contact-', '');
      return <ContactForm propertyId={propertyId} setCurrentView={setCurrentView} />;
    }

    switch (currentView) {
      case 'home':
        return <HomePage setCurrentView={setCurrentView} />;
      case 'properties':
        return <PropertyList setCurrentView={setCurrentView} />;
      case 'login':
        return <LoginForm setCurrentView={setCurrentView} />;
      case 'register':
        return <RegisterForm setCurrentView={setCurrentView} />;
      case 'dashboard':
        return <Dashboard setCurrentView={setCurrentView} />;
      case 'add-property':
        return <AddProperty setCurrentView={setCurrentView} />;
      default:
        return <HomePage setCurrentView={setCurrentView} />;
    }
  };

  return (
    <AuthProvider>
      <AppProvider>
        <div className="min-h-screen bg-gray-50">
          <Header currentView={currentView} setCurrentView={setCurrentView} />
          {renderCurrentView()}
        </div>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;