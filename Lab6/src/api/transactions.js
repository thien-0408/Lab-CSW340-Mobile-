import client from './client';

export const getTransactions = () => client.get('/transactions').then((r) => r.data);
export const getTransaction = (id) => client.get(`/transactions/${id}`).then((r) => r.data);
