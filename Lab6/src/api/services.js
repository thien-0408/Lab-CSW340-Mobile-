import client from './client';

export const getServices = () => client.get('/services').then((r) => r.data);
export const getService = (id) => client.get(`/services/${id}`).then((r) => r.data);
export const addService = (name, price) => client.post('/services', { name, price }).then((r) => r.data);
export const updateService = (id, name, price) => client.put(`/services/${id}`, { name, price }).then((r) => r.data);
export const deleteService = (id) => client.delete(`/services/${id}`).then((r) => r.data);
