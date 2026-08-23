import React, { useCallback, useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Appbar, Text, ActivityIndicator, Menu } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { getCustomer, deleteCustomer } from '../api/customers';
import { colors } from '../theme';
import { formatCurrency, formatDateTime } from '../utils/format';
import TransactionCard from '../components/TransactionCard';

export default function CustomerDetailScreen({ route, navigation }) {
  const { id } = route.params;
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);

  const load = async () => {
    try {
      const data = await getCustomer(id);
      setCustomer(data);
    } catch (err) {
      Alert.alert('Error', 'Failed to load customer');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      load();
    }, [id])
  );

  const confirmDelete = () => {
    setMenuVisible(false);
    Alert.alert(
      'Alert',
      'Are you sure you want to remove this client? This will not be possible to return',
      [
        { text: 'CANCEL', style: 'cancel' },
        {
          text: 'DELETE',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteCustomer(id);
              navigation.goBack();
            } catch (err) {
              Alert.alert('Error', 'Failed to delete customer');
            }
          },
        },
      ]
    );
  };

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} color={colors.primary} />;

  const transactions = customer?.transactions || [];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Appbar.Header style={{ backgroundColor: colors.primary }}>
        <Appbar.BackAction color="#fff" onPress={() => navigation.goBack()} />
        <Appbar.Content title="Customer detail" color="#fff" />
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={<Appbar.Action icon="dots-vertical" color="#fff" onPress={() => setMenuVisible(true)} />}
        >
          <Menu.Item
            onPress={() => {
              setMenuVisible(false);
              navigation.navigate('CustomerForm', { id });
            }}
            title="Edit"
          />
          <Menu.Item onPress={confirmDelete} title="Delete" />
        </Menu>
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.section}>General information</Text>
        <Text style={styles.row}>
          <Text style={styles.label}>Name: </Text>
          {customer?.name}
        </Text>
        <Text style={styles.row}>
          <Text style={styles.label}>Phone: </Text>
          {customer?.phone}
        </Text>
        <Text style={styles.row}>
          <Text style={styles.label}>Total spent: </Text>
          {formatCurrency(customer?.totalSpent)}
        </Text>
        <Text style={styles.row}>
          <Text style={styles.label}>Time: </Text>
          {formatDateTime(customer?.createdAt)}
        </Text>
        <Text style={styles.row}>
          <Text style={styles.label}>Last update: </Text>
          {formatDateTime(customer?.updatedAt)}
        </Text>

        <Text style={[styles.section, { marginTop: 16 }]}>Transaction history</Text>
        {transactions.length === 0 && <Text style={styles.muted}>No transactions yet</Text>}
        {transactions.map((tx) => (
          <TransactionCard key={tx._id} transaction={tx} onPress={() => navigation.navigate('TransactionDetail', { id: tx._id })} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  body: { padding: 16 },
  section: { color: colors.primary, fontWeight: '700', marginBottom: 8 },
  row: { marginBottom: 8 },
  label: { fontWeight: '700' },
  muted: { color: colors.muted },
});
