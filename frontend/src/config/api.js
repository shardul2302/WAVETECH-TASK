
export const API_BASE = 'http://localhost:5000';

export const API_ENDPOINTS = {

  LOGIN: `${API_BASE}/api/auth/login`,

  LIST_INVOICES: `${API_BASE}/list-invoice`,
  CREATE_INVOICE: `${API_BASE}/new-invoice`,
  UPDATE_INVOICE: (id) => `${API_BASE}/update-invoice/${id}`,
  DELETE_INVOICE: (invoiceNumber, fy) => `${API_BASE}/delete-invoice/${invoiceNumber}/${fy}`,
  
  LIST_USERS: `${API_BASE}/api/users/list`,
  CREATE_USER: `${API_BASE}/api/users/create`,
  UPDATE_USER: (id) => `${API_BASE}/api/users/update/${id}`,
  DELETE_USER: (id) => `${API_BASE}/api/users/delete/${id}`,
};