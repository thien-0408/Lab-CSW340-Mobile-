import React, { useCallback, useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Appbar, Text, ActivityIndicator, Divider } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { getTransaction } from '../api/transactions';
import { colors } from '../theme';
import { formatCurrency, formatDateTime } from '../utils/format';

function Row({ label, value, bold, highlight }) {
  return (
    <View style={styles.row}>
      <Text style={[styles.rowLabel, bold && styles.bold]}>{label}</Text>
      <Text style={[styles.rowValue, bold && styles.bold, highlight && styles.highlight]}>{value}</Text>
    </View>
  );
}

export default function TransactionDetailScreen({ route, navigation }) {
  const { id } = route.params;
  const [tx, setTx] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const data = await getTransaction(id);
      setTx(data);
    } catch (err) {
      Alert.alert('Error', 'Failed to load transaction');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      load();
    }, [id])
  );

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} color={colors.primary} />;

  const services = tx?.services || [];
  const total = services.reduce((sum, s) => sum + (s.price || 0) * (s.quantity || 1), 0);
  const discount = (tx?.priceBeforePromotion ?? total) - (tx?.price ?? total);

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: colors.primary }}>
        <Appbar.BackAction color="#fff" onPress={() => navigation.goBack()} />
        <Appbar.Content title="Transaction detail" color="#fff" />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.section}>General information</Text>
        <Row label="Transaction code" value={tx?.id || tx?._id} />
        <Row label="Customer" value={`${tx?.customer?.name || ''} - ${tx?.customer?.phone || ''}`} />
        <Row label="Creation time" value={formatDateTime(tx?.createdAt)} />

        <Divider style={styles.divider} />
        <Text style={styles.section}>Services list</Text>
        {services.map((s) => (
          <Row key={s._id} label={`${s.name}  x${s.quantity || 1}`} value={formatCurrency((s.price || 0) * (s.quantity || 1))} />
        ))}
        <Row label="Total" value={formatCurrency(total)} bold />

        <Divider style={styles.divider} />
        <Text style={styles.section}>Cost</Text>
        <Row label="Amount of money" value={formatCurrency(tx?.priceBeforePromotion ?? total)} />
        <Row label="Discount" value={`-${formatCurrency(discount)}`} />
        <Row label="Total payment" value={formatCurrency(tx?.price ?? total)} bold highlight />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  body: { padding: 16 },
  section: { color: colors.primary, fontWeight: '700', marginTop: 16, marginBottom: 8 },
  divider: { marginVertical: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  rowLabel: { color: colors.muted, flex: 1, marginRight: 8 },
  rowValue: { fontWeight: '600' },
  bold: { fontWeight: '700', color: colors.text },
  highlight: { color: colors.primary, fontSize: 16 },
});
