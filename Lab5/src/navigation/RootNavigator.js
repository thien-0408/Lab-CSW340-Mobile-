import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ServiceFormScreen from '../screens/ServiceFormScreen';
import ServiceDetailScreen from '../screens/ServiceDetailScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ServiceForm" component={ServiceFormScreen} />
          <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
