import client from './client';

export const getCustomers = () => client.get('/customers').then((r) => r.data);
export const addCustomer = (name, phone) => client.post('/customers', { name, phone }).then((r) => r.data);
export const getCustomer = (id) => client.post(`/Customers/${id}`).then((r) => r.data);
export const updateCustomer = (id, name, phone) => client.put(`/Customers/${id}`, { name, phone }).then((r) => r.data);
export const deleteCustomer = (id) => client.delete(`/Customers/${id}`).then((r) => r.data);
