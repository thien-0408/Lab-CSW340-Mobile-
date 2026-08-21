import client from './client';

export function login(phone, password) {
  return client.post('/auth', { phone, password }).then((r) => r.data);
}
