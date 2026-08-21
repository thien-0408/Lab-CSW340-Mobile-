import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import MainTabs from './MainTabs';
import ServiceFormScreen from '../screens/ServiceFormScreen';
import ServiceDetailScreen from '../screens/ServiceDetailScreen';
import CustomerFormScreen from '../screens/CustomerFormScreen';
import TransactionDetailScreen from '../screens/TransactionDetailScreen';

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
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="ServiceForm" component={ServiceFormScreen} />
          <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
          <Stack.Screen name="CustomerForm" component={CustomerFormScreen} />
          <Stack.Screen name="TransactionDetail" component={TransactionDetailScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
