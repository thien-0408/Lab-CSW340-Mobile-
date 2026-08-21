import React, { useCallback, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Appbar, Text, ActivityIndicator, FAB } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { getCustomers } from '../api/customers';
import { colors } from '../theme';
import CustomerCard from '../components/CustomerCard';

export default function CustomerListScreen({ navigation }) {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const data = await getCustomers();
      setCustomers(Array.isArray(data) ? data : data?.customers || []);
    } catch (err) {
      console.warn('Failed to load customers', err?.message);
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
        <Appbar.Content title="Customer" color="#fff" />
      </Appbar.Header>
      {loading ? (
        <ActivityIndicator style={{ marginTop: 40 }} color={colors.primary} />
      ) : (
        <FlatList
          data={customers}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ padding: 16, paddingBottom: 96 }}
          renderItem={({ item }) => (
            <CustomerCard customer={item} onPress={() => navigation.navigate('CustomerDetail', { id: item._id })} />
          )}
          ListEmptyComponent={<Text style={styles.empty}>No customers yet</Text>}
        />
      )}
      <FAB icon="plus" style={styles.fab} color="#fff" onPress={() => navigation.navigate('CustomerForm')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  empty: { textAlign: 'center', marginTop: 40, color: colors.muted },
  fab: { position: 'absolute', right: 20, bottom: 20, backgroundColor: colors.primary },
});
