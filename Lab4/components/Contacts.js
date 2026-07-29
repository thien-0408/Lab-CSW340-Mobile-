import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ContactListItem from './ContactListItem';
import { loadContacts } from '../utilities/api';

const keyExtractor = ({ id }) => id;

const Contacts = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const run = async () => {
        try {
          const data = await loadContacts();
          setContacts(data);
        } catch (e) {
          console.log('loadContacts error:', e);
          Alert.alert('Error', e?.message ?? String(e));
        }
      };

      run();
    }, [])
  );

  const renderContacts = ({ item }) => (
    <ContactListItem
      name={item.name}
      avatar={item.avatar}
      phone={item.phone}
      onPress={() => navigation.navigate('ProfileContact', { contact: item })}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={keyExtractor}
        renderItem={renderContacts}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default Contacts;