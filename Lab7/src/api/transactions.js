import client from './client';

export const getTransactions = () => client.get('/transactions').then((r) => r.data);
export const getTransaction = (id) => client.get(`/transactions/${id}`).then((r) => r.data);
export const addTransaction = (customerId, services) =>
  client.post('/transactions', { CustomerId: customerId, Services: services }).then((r) => r.data);
export const deleteTransaction = (id) => client.delete(`/transactions/${id}`).then((r) => r.data);
