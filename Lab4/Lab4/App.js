/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import Store from './src/Store';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Contacts from './src/Contact';
import ProfileContact from './src/ProfileContact';
import Favorites from './src/Favorites';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createStackNavigator();
function ContactsScreens() {
    return (
        <Stack.Navigator
            initialRouteName="Contacts"
            screenOptions={{
                headerShown: true,
            }}
        >
            <Stack.Screen
                name="Contacts"
                component={Contacts}
                options={{ title: 'Contacts' }}
            />
            <Stack.Screen
                name="ProfileContact"
                component={ProfileContact}
                options={{ title: 'Profile contact' }}
            />
        </Stack.Navigator>
    );
}

function FavoriteScreens() {
    return (
        <Stack.Navigator
            initialRouteName="Favorites"
            screenOptions={{
                headerShown: true,
            }}
        >
            <Stack.Screen
                name="Favorites"
                component={Favorites}
                options={{ title: 'Favorites' }}
            />
            <Stack.Screen
                name="ProfileContact"
                component={ProfileContact}
                options={{ title: 'Profile contact' }}
            />
        </Stack.Navigator>
    );
}

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="Contacts"
            screenOptions={{
                tabBarStyle: { backgroundColor: '#3271a8' },
                tabBarShowLabel: false,
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'black',
                headerShown: false,
            }}
        >
            <Tab.Screen
                name="Contacts"
                component={ContactsScreens}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="format-list-bulleted"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="Favorites"
                component={FavoriteScreens}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="star-check"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const App = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Provider store={Store}>
                <NavigationContainer>
                    <TabNavigator />
                </NavigationContainer>
            </Provider>
        </GestureHandlerRootView>
    );
};

export default App;