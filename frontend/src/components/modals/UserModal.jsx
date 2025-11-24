
import React from 'react';

const UserModal = ({ 
  showModal, 
  editMode, 
  formData, 
  onFormChange, 
  onSubmit, 
  onClose 
}) => {
  if (!showModal) return null;

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      background: 'rgba(0,0,0,0.5)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      zIndex: 1000 
    }}>
      <div style={{ 
        background: 'white', 
        padding: '30px', 
        borderRadius: '8px', 
        width: '400px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ marginTop: 0, marginBottom: '20px' }}>
          {editMode ? 'Edit User Role' : 'Create User'}
        </h3>
        <div>
          {!editMode && (
            <>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                  Username:
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => onFormChange({ ...formData, username: e.target.value })}
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    border: '1px solid #ddd',
                    borderRadius: '4px'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                  Email:
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => onFormChange({ ...formData, email: e.target.value })}
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    border: '1px solid #ddd',
                    borderRadius: '4px'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                  Password:
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => onFormChange({ ...formData, password: e.target.value })}
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    border: '1px solid #ddd',
                    borderRadius: '4px'
                  }}
                />
              </div>
            </>
          )}
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
              Role:
            </label>
            <select
              value={formData.role}
              onChange={(e) => onFormChange({ ...formData, role: e.target.value })}
              style={{ 
                width: '100%', 
                padding: '8px', 
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
              disabled={!editMode}
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
            {!editMode && (
              <small style={{ color: '#666', display: 'block', marginTop: '5px' }}>
                Note: Only USER accounts can be created
              </small>
            )}
          </div>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={onSubmit}
              style={{ 
                flex: 1, 
                padding: '10px', 
                background: '#28a745', 
                color: 'white', 
                border: 'none',
                borderRadius: '4px', 
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '500'
              }}
            >
              {editMode ? 'Update' : 'Create'}
            </button>
            <button
              onClick={onClose}
              style={{ 
                flex: 1, 
                padding: '10px', 
                background: '#6c757d', 
                color: 'white', 
                border: 'none',
                borderRadius: '4px', 
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '500'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;