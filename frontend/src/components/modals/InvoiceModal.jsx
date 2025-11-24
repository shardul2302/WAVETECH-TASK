
import React from 'react';

const InvoiceModal = ({ 
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
          {editMode ? 'Edit Invoice' : 'Create Invoice'}
        </h3>
        <div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
              Invoice Number:
            </label>
            <input
              type="number"
              value={formData.invoiceNumber}
              onChange={(e) => onFormChange({ ...formData, invoiceNumber: e.target.value })}
              style={{ 
                width: '100%', 
                padding: '8px', 
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
              disabled={editMode}
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
              Invoice Date:
            </label>
            <input
              type="date"
              value={formData.invoicedate}
              onChange={(e) => onFormChange({ ...formData, invoicedate: e.target.value })}
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
              Amount:
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.invoiceammount}
              onChange={(e) => onFormChange({ ...formData, invoiceammount: e.target.value })}
              style={{ 
                width: '100%', 
                padding: '8px', 
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
              Financial Year:
            </label>
            <input
              type="text"
              value={formData.finicialyear}
              onChange={(e) => onFormChange({ ...formData, finicialyear: e.target.value })}
              style={{ 
                width: '100%', 
                padding: '8px', 
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
              placeholder="e.g., 2023-2024"
              disabled={editMode}
            />
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

export default InvoiceModal;