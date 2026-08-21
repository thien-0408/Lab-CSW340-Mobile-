import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { colors } from '../theme';
import { formatCurrency } from '../utils/format';

export default function CustomerCard({ customer, onPress }) {
  const isMember = customer.loyalty === 'member';
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} disabled={!onPress}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>Customer: {customer.name}</Text>
        <Text style={styles.muted}>Phone: {customer.phone}</Text>
        <Text style={styles.muted}>
          Total money: <Text style={styles.price}>{formatCurrency(customer.totalSpent)}</Text>
        </Text>
      </View>
      <Text style={[styles.badge, isMember && styles.badgeMember]}>{isMember ? 'Member' : 'Guest'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  name: { fontWeight: '700', marginBottom: 4 },
  muted: { color: colors.muted, fontSize: 13 },
  price: { color: colors.primary, fontWeight: '700' },
  badge: { color: colors.muted, fontWeight: '600', fontSize: 12 },
  badgeMember: { color: colors.primary },
});
