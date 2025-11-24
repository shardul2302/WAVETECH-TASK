
import React from 'react';

const TabNavigation = ({ activeTab, onTabChange }) => {
  const tabStyle = (isActive) => ({
    padding: '15px 30px',
    background: isActive ? '#007bff' : 'transparent',
    color: isActive ? 'white' : 'black',
    border: 'none',
    cursor: 'pointer',
    borderBottom: isActive ? '3px solid #0056b3' : 'none',
    fontSize: '16px',
    fontWeight: '500'
  });

  return (
    <div style={{ borderBottom: '1px solid #ddd' }}>
      <button
        onClick={() => onTabChange('invoices')}
        style={tabStyle(activeTab === 'invoices')}
      >
        Invoices
      </button>
      <button
        onClick={() => onTabChange('users')}
        style={tabStyle(activeTab === 'users')}
      >
        Users
      </button>
    </div>
  );
};

export default TabNavigation;