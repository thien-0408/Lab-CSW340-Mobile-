import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

const CONTACTS_KEY = 'contacts';

export async function fetchContacts() {
  const response = await fetch('https://randomuser.me/api/?results=50');
  const data = await response.json();

  return data.results.map((user) => ({
    id: Crypto.randomUUID(),
    name: `${user.name.first} ${user.name.last}`,
    avatar: user.picture.large,
    phone: user.phone,
    cell: user.cell,
    email: user.email,
    favorite: Math.random() < 0.2,
  }));
}

export async function loadContacts() {
  const cached = await AsyncStorage.getItem(CONTACTS_KEY);
  if (cached) return JSON.parse(cached);

  const contacts = await fetchContacts();
  await AsyncStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
  return contacts;
}

export async function toggleFavorite(id) {
  const cached = await AsyncStorage.getItem(CONTACTS_KEY);
  const contacts = cached ? JSON.parse(cached) : [];

  const updated = contacts.map((contact) =>
    contact.id === id ? { ...contact, favorite: !contact.favorite } : contact
  );

  await AsyncStorage.setItem(CONTACTS_KEY, JSON.stringify(updated));
  return updated;
}