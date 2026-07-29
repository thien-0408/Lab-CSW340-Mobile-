import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

const CONTACTS_KEY = 'contacts';

export const fetchContacts = async () => {
  const response = await fetch('https://randomuser.me/api/?results=50');
  const data = await response.json();

  // Chuáº©n hÃ³a dá»¯ liá»‡u tráº£ vá» tá»« RandomUser API
  return data.results.map((user) => ({
    id: uuidv4(),
    name: `${user.name.first} ${user.name.last}`,
    avatar: user.picture.large,
    phone: user.phone,
    cell: user.cell,
    email: user.email,
    favorite: Math.random() < 0.2, // Random ngáº«u nhiÃªn má»™t sá»‘ item yÃªu thÃ­ch
  }));
};

export const loadContacts = async () => {
  const cached = await AsyncStorage.getItem(CONTACTS_KEY);
  if (cached) {
    return JSON.parse(cached);
  }

  const contacts = await fetchContacts();
  await AsyncStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
  return contacts;
};

export const toggleFavorite = async (id) => {
  const cached = await AsyncStorage.getItem(CONTACTS_KEY);
  const contacts = cached ? JSON.parse(cached) : [];

  const updated = contacts.map((contact) =>
    contact.id === id ? { ...contact, favorite: !contact.favorite } : contact
  );

  await AsyncStorage.setItem(CONTACTS_KEY, JSON.stringify(updated));
  return updated;
};