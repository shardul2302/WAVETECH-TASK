
import React, { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../../config/api';
import UserModal from '../modals/UserModal';

const UserDashboard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentEditUser, setCurrentEditUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: 'USER',
    password: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, roleFilter]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_ENDPOINTS.LIST_USERS}?page=1`);
      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const filterUsers = () => {
    let filtered = [...users];
    
    if (roleFilter) {
      filtered = filtered.filter(user => user.role === roleFilter);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.uniqueId?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredUsers(filtered);
  };

  const handleCreate = () => {
    setEditMode(false);
    setCurrentEditUser(null);
    setFormData({
      username: '',
      email: '',
      role: 'USER',
      password: ''
    });
    setShowModal(true);
  };

  const handleEdit = (user) => {
    setEditMode(true);
    setCurrentEditUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      role: user.role,
      password: ''
    });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    try {
      if (editMode) {
        const response = await fetch(API_ENDPOINTS.UPDATE_USER(currentEditUser._id), {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ role: formData.role })
        });
        const data = await response.json();
        alert(data.message);
      } else {
        if (!formData.username || !formData.email || !formData.password) {
          alert('All fields are required');
          return;
        }
        const response = await fetch(API_ENDPOINTS.CREATE_USER, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            creatorRole: 'ADMIN'
          })
        });
        const data = await response.json();
        alert(data.message);
      }
      
      setShowModal(false);
      fetchUsers();
    } catch (error) {
      console.error('Error:', error);
      alert('Operation failed');
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    try {
      const response = await fetch(API_ENDPOINTS.DELETE_USER(userId), {
        method: 'DELETE'
      });
      const data = await response.json();
      alert(data.message);
      fetchUsers();
    } catch (error) {
      console.error('Error:', error);
      alert('Delete failed');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>User Dashboard</h2>
      
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="Search by name, email, or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '8px', flex: 1, border: '1px solid #ddd', borderRadius: '4px' }}
        />
        
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
        >
          <option value="">All Roles</option>
          <option value="ADMIN">ADMIN</option>
          <option value="USER">USER</option>
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
          Create User
        </button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
        <thead>
          <tr style={{ background: '#f8f9fa' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Username</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Email</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Role</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.uniqueId}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.username}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.email}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.role}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                <button
                  onClick={() => handleEdit(user)}
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
                  Edit Role
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
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

      <UserModal
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

export default UserDashboard;