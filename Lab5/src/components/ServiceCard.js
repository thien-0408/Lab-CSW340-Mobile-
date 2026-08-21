import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { colors } from '../theme';
import { formatCurrency } from '../utils/format';

export default function ServiceCard({ service, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.name} numberOfLines={1}>{service.name}</Text>
      <Text style={styles.price}>{formatCurrency(service.price)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  name: { flex: 1, fontWeight: '600', marginRight: 8 },
  price: { fontWeight: '700', color: colors.primary },
});
