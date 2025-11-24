
import React, { useState, useEffect } from 'react';
import { API_BASE, API_ENDPOINTS } from '../../config/api';
import InvoiceModal from '../modals/InvoiceModal';

const InvoiceDashboard = () => {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [fyFilter, setFyFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState(null);
  const [formData, setFormData] = useState({
    invoiceNumber: '',
    invoicedate: '',
    invoiceammount: '',
    finicialyear: ''
  });

  useEffect(() => {
    fetchInvoices();
  }, []);

  useEffect(() => {
    filterInvoices();
  }, [invoices, searchTerm, fyFilter]);

  const fetchInvoices = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.LIST_INVOICES);
      const data = await response.json();
      setInvoices(data.invoicelist || []);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  const filterInvoices = () => {
    let filtered = [...invoices];
    
    if (fyFilter) {
      filtered = filtered.filter(inv => inv.finicialyear === fyFilter);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(inv => 
        inv.invoiceNumber.toString().includes(searchTerm) ||
        inv.finicialyear.includes(searchTerm)
      );
    }
    
    setFilteredInvoices(filtered);
  };

  const handleCreate = () => {
    setEditMode(false);
    setCurrentInvoice(null);
    setFormData({
      invoiceNumber: '',
      invoicedate: '',
      invoiceammount: '',
      finicialyear: ''
    });
    setShowModal(true);
  };

  const handleEdit = (invoice) => {
    setEditMode(true);
    setCurrentInvoice(invoice);
    setFormData({
      invoiceNumber: invoice.invoiceNumber,
      invoicedate: invoice.invoicedate.split('T')[0],
      invoiceammount: invoice.invoiceammount,
      finicialyear: invoice.finicialyear
    });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!formData.invoiceNumber || !formData.invoicedate || !formData.invoiceammount || !formData.finicialyear) {
      alert('All fields are required');
      return;
    }

    try {
      if (editMode) {
        const response = await fetch(API_ENDPOINTS.UPDATE_INVOICE(currentInvoice._id), {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            invoicedate: formData.invoicedate,
            invoiceammount: parseFloat(formData.invoiceammount)
          })
        });
        const data = await response.json();
        alert(data.message);
      } else {
        const response = await fetch(API_ENDPOINTS.CREATE_INVOICE, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            invoiceNumber: parseInt(formData.invoiceNumber),
            invoicedate: formData.invoicedate,
            invoiceammount: parseFloat(formData.invoiceammount),
            finicialyear: formData.finicialyear
          })
        });
        const data = await response.json();
        alert(data.message);
      }
      
      setShowModal(false);
      fetchInvoices();
    } catch (error) {
      console.error('Error:', error);
      alert('Operation failed');
    }
  };

  const handleDelete = async (invoiceNumber, finicialyear) => {
    if (!window.confirm('Are you sure you want to delete this invoice?')) return;
    
    try {
      const response = await fetch(API_ENDPOINTS.DELETE_INVOICE(invoiceNumber, finicialyear), {
        method: 'DELETE'
      });
      const data = await response.json();
      alert(data.message);
      fetchInvoices();
    } catch (error) {
      console.error('Error:', error);
      alert('Delete failed');
    }
  };

  const uniqueFYs = [...new Set(invoices.map(inv => inv.finicialyear))];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Invoice Dashboard</h2>
      
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="Search by invoice number or FY..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '8px', flex: 1, border: '1px solid #ddd', borderRadius: '4px' }}
        />
        
        <select
          value={fyFilter}
          onChange={(e) => setFyFilter(e.target.value)}
          style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
        >
          <option value="">All FY</option>
          {uniqueFYs.map(fy => (
            <option key={fy} value={fy}>{fy}</option>
          ))}
        </select>
        
        <button
          onClick={handleCreate}
          style={{ 
            padding: '8px 16px', 
            background: '#28a745', 
            color: 'white', 
            border: 'none',
            borderRadius: '4px', 
            cursor: 'pointer' 
          }}
        >
          Create Invoice
        </button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
        <thead>
          <tr style={{ background: '#f8f9fa' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Invoice Number</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Date</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Amount</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Financial Year</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInvoices.map((invoice) => (
            <tr key={invoice._id}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{invoice.invoiceNumber}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                {new Date(invoice.invoicedate).toLocaleDateString()}
              </td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{invoice.invoiceammount}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{invoice.finicialyear}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                <button
                  onClick={() => handleEdit(invoice)}
                  style={{ 
                    marginRight: '5px', 
                    padding: '5px 10px', 
                    background: '#007bff', 
                    color: 'white', 
                    border: 'none',
                    borderRadius: '4px', 
                    cursor: 'pointer' 
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(invoice.invoiceNumber, invoice.finicialyear)}
                  style={{ 
                    padding: '5px 10px', 
                    background: '#dc3545', 
                    color: 'white', 
                    border: 'none',
                    borderRadius: '4px', 
                    cursor: 'pointer' 
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <InvoiceModal
        showModal={showModal}
        editMode={editMode}
        formData={formData}
        onFormChange={setFormData}
        onSubmit={handleSubmit}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default InvoiceDashboard;