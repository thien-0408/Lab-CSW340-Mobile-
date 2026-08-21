import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import TransactionListScreen from '../screens/TransactionListScreen';
import CustomerListScreen from '../screens/CustomerListScreen';
import SettingScreen from '../screens/SettingScreen';
import { colors } from '../theme';

const Tab = createBottomTabNavigator();

const icons = {
  Home: 'home',
  Transaction: 'cash-multiple',
  Customer: 'account-group',
  Setting: 'cog',
};

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name={icons[route.name]} color={color} size={size} />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Transaction" component={TransactionListScreen} />
      <Tab.Screen name="Customer" component={CustomerListScreen} />
      <Tab.Screen name="Setting" component={SettingScreen} />
    </Tab.Navigator>
  );
}
