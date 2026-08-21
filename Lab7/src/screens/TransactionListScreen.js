import React, { useCallback, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Appbar, Text, ActivityIndicator, FAB } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { getTransactions } from '../api/transactions';
import { colors } from '../theme';
import TransactionCard from '../components/TransactionCard';

export default function TransactionListScreen({ navigation }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const data = await getTransactions();
      setTransactions(Array.isArray(data) ? data : data?.transactions || []);
    } catch (err) {
      console.warn('Failed to load transactions', err?.message);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      load();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: colors.primary }}>
        <Appbar.Content title="Transaction" color="#fff" />
      </Appbar.Header>
      {loading ? (
        <ActivityIndicator style={{ marginTop: 40 }} color={colors.primary} />
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ padding: 16, paddingBottom: 96 }}
          renderItem={({ item }) => (
            <TransactionCard transaction={item} onPress={() => navigation.navigate('TransactionDetail', { id: item._id })} />
          )}
          ListEmptyComponent={<Text style={styles.empty}>No transactions yet</Text>}
        />
      )}
      <FAB icon="plus" style={styles.fab} color="#fff" onPress={() => navigation.navigate('AddTransaction')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  empty: { textAlign: 'center', marginTop: 40, color: colors.muted },
  fab: { position: 'absolute', right: 20, bottom: 20, backgroundColor: colors.primary },
});
