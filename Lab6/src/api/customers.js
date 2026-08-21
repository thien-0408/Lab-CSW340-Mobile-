import client from './client';

export const getCustomers = () => client.get('/customers').then((r) => r.data);
export const addCustomer = (name, phone) => client.post('/customers', { name, phone }).then((r) => r.data);
