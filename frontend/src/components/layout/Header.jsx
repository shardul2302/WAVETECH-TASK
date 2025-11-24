
import React from 'react';

const Header = ({ user, onLogout }) => {
  return (
    <div style={{ 
      background: '#343a40', 
      color: 'white', 
      padding: '15px 20px', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center' 
    }}>
      <h1 style={{ margin: 0, fontSize: '24px' }}>
        Invoice & User Management
      </h1>
      <div>
        <span style={{ marginRight: '20px' }}>
          {user.email} ({user.role})
        </span>
        <button
          onClick={onLogout}
          style={{ 
            padding: '8px 16px', 
            background: '#dc3545', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer' 
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;