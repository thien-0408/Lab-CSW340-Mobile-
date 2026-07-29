import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';

const DetailListItem = ({ icon, title, subtitle }) => {
  return (
    <View style={styles.container}>
      <Icon name={icon} size={22} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  icon: {
    width: 30,
    color: 'grey',
  },
  textContainer: {
    marginLeft: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  subtitle: {
    color: 'blue',
    fontSize: 14,
    marginTop: 2,
  },
});

export default DetailListItem;
