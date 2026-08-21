import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login as loginApi } from '../api/auth';
import { TOKEN_KEY, USER_KEY } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [phone, setPhone] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [storedToken, storedPhone] = await Promise.all([
        AsyncStorage.getItem(TOKEN_KEY),
        AsyncStorage.getItem(USER_KEY),
      ]);
      if (storedToken) setToken(storedToken);
      if (storedPhone) setPhone(storedPhone);
      setLoading(false);
    })();
  }, []);

  const login = async (phoneNumber, password) => {
    const data = await loginApi(phoneNumber, password);
    const receivedToken = data?.token || data?.accessToken || data?.access_token;
    await AsyncStorage.setItem(TOKEN_KEY, receivedToken || '');
    await AsyncStorage.setItem(USER_KEY, phoneNumber);
    setToken(receivedToken);
    setPhone(phoneNumber);
    return data;
  };

  const logout = async () => {
    await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
    setToken(null);
    setPhone(null);
  };

  return (
    <AuthContext.Provider value={{ token, phone, loading, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
