import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const BASE_URL = 'https://kami-backend-5rs0.onrender.com';
export const TOKEN_KEY = '@kami_token';
export const USER_KEY = '@kami_user';

const client = axios.create({ baseURL: BASE_URL, timeout: 15000 });

client.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default client;
