// 
import React, { useState } from 'react';
import Login from './components/auth/Login';
import Header from './components/layout/Header';
import TabNavigation from './components/layout/TabNavigation';
import InvoiceDashboard from './components/dashboard/InvoiceDashboard';
import UserDashboard from './components/dashboard/UserDashboard';

export default function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('invoices');

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('invoices');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Show login if no user is logged in
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div>
      <Header user={user} onLogout={handleLogout} />
      
      <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
      
      {activeTab === 'invoices' || user.role !== 'ADMIN' ? (
        <InvoiceDashboard />
      ) : (
        <UserDashboard />
      )}
    </div>
  );
}