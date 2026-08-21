import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { colors } from '../theme';
import { formatCurrency, formatDateTime } from '../utils/format';

export default function TransactionCard({ transaction, onPress }) {
  const isCancelled = transaction.status === 'cancelled' || transaction.status === 'canceled';
  const serviceNames = (transaction.services || []).map((s) => s.name).join(', ');
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.headerRow}>
        <Text style={styles.code} numberOfLines={1}>
          {transaction.id || transaction._id} - {formatDateTime(transaction.createdAt)}
          {isCancelled ? <Text style={styles.cancelled}>  · Cancelled</Text> : null}
        </Text>
        <Text style={styles.price}>{formatCurrency(transaction.price)}</Text>
      </View>
      {!!serviceNames && (
        <Text style={styles.services} numberOfLines={2}>
          - {serviceNames}
        </Text>
      )}
      <Text style={styles.muted}>Customer: {transaction.customer?.name || ''}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  code: { flex: 1, fontWeight: '600', fontSize: 12, color: colors.text, marginRight: 8 },
  cancelled: { color: colors.danger },
  price: { fontWeight: '700', color: colors.primary },
  services: { marginTop: 6, fontSize: 13, color: colors.text },
  muted: { marginTop: 4, fontSize: 12, color: colors.muted },
});
