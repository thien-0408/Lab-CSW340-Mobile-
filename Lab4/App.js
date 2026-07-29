import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Contacts from './components/Contacts';
import ProfileContact from './components/ProfileContact';
import Favorites from './components/Favorites';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function ContactsScreens() {
  return (
    <Stack.Navigator initialRouteName="Contacts" screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Contacts" component={Contacts} options={{ title: 'Contacts' }} />
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
    <Stack.Navigator initialRouteName="Favorites" screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Favorites" component={Favorites} options={{ title: 'Favorites' }} />
      <Stack.Screen
        name="ProfileContact"
        component={ProfileContact}
        options={{ title: 'Profile contact' }}
      />
    </Stack.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="ContactsScreens"
        screenOptions={{ drawerActiveTintColor: 'blue' }}
      >
        <Drawer.Screen
          name="ContactsScreens"
          component={ContactsScreens}
          options={{ title: 'Contacts' }}
        />
        <Drawer.Screen
          name="FavoriteScreens"
          component={FavoriteScreens}
          options={{ title: 'Favorites' }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
