import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ContactListItem from './ContactListItem';
import { loadContacts } from './storage';

const keyExtractor = ({ id }) => id;

const Contacts = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadContacts()
        .then((data) => setContacts(data))
        .catch(() => {});
    }, [])
  );

  const renderContacts = ({ item }) => {
    const { name, avatar, phone } = item;
    return (
      <ContactListItem
        name={name}
        avatar={avatar}
        phone={phone}
        onPress={() => navigation.navigate('ProfileContact', { contact: item })}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList data={contacts} keyExtractor={keyExtractor} renderItem={renderContacts} />
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
