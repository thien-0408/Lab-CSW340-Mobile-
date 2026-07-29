import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import ContactThum from './ContactThum';
import DetailListItem from './DetailListItem';
import { toggleFavorite } from '../utilities/api';

const ProfileContact = ({ route }) => {
  const { contact } = route.params;
  const { id, avatar, name, email, phone, cell } = contact;
  const [favorite, setFavorite] = useState(contact.favorite);

  const handleToggleFavorite = async () => {
    await toggleFavorite(id);
    setFavorite((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarSection}>
        <ContactThum avatar={avatar} name={name} phone={phone} />
      </View>
      <View style={styles.detailsSection}>
        <DetailListItem icon="mail" title="Email" subtitle={email} />
        <DetailListItem icon="phone" title="Work" subtitle={phone} />
        <DetailListItem icon="smartphone" title="Personal" subtitle={cell} />
        <View style={{ alignItems: 'center' }}>
          <IconButton
            icon={favorite ? 'star-check' : 'star-check-outline'}
            iconColor="#663399"
            size={20}
            onPress={handleToggleFavorite}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  detailsSection: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default ProfileContact;
