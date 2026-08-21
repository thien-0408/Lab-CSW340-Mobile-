import React, { useCallback, useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Appbar, Text, ActivityIndicator } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getCustomer, deleteCustomer } from '../api/customers';
import { colors } from '../theme';
import { formatCurrency, formatDateTime } from '../utils/format';
import TransactionCard from '../components/TransactionCard';

export default function CustomerDetailScreen({ route, navigation }) {
  const { id } = route.params;
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

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
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: colors.primary }}>
        <Appbar.BackAction color="#fff" onPress={() => navigation.goBack()} />
        <Appbar.Content title="Customer detail" color="#fff" />
        <Menu>
          <MenuTrigger customStyles={{ triggerWrapper: styles.menuTrigger }}>
            <MaterialCommunityIcons name="dots-vertical" size={24} color="#fff" />
          </MenuTrigger>
          <MenuOptions>
            <MenuOption onSelect={() => navigation.navigate('CustomerForm', { id })} text="Edit" />
            <MenuOption onSelect={confirmDelete} text="Delete" />
          </MenuOptions>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  menuTrigger: { paddingHorizontal: 16 },
  body: { padding: 16 },
  section: { color: colors.primary, fontWeight: '700', marginBottom: 8 },
  row: { marginBottom: 8 },
  label: { fontWeight: '700' },
  muted: { color: colors.muted },
});
