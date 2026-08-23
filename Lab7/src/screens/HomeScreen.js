import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Appbar, Text, ActivityIndicator, FAB } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { getServices } from '../api/services';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme';
import ServiceCard from '../components/ServiceCard';

export default function HomeScreen({ navigation }) {
  const { phone } = useAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = async () => {
    try {
      const data = await getServices();
      setServices(Array.isArray(data) ? data : data?.services || []);
    } catch (err) {
      console.warn('Failed to load services', err?.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      load();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    load();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Appbar.Header style={{ backgroundColor: colors.primary }}>
        <Appbar.Content title={phone || 'KAMI SPA'} color="#fff" />
        <Appbar.Action icon="account-circle" color="#fff" onPress={() => {}} />
      </Appbar.Header>
      <Text style={styles.heading}>Danh sách dịch vụ</Text>
      {loading ? (
        <ActivityIndicator style={{ marginTop: 40 }} color={colors.primary} />
      ) : (
        <FlatList
          data={services}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ padding: 16, paddingBottom: 96 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          renderItem={({ item }) => (
            <ServiceCard service={item} onPress={() => navigation.navigate('ServiceDetail', { id: item._id })} />
          )}
          ListEmptyComponent={<Text style={styles.empty}>No services yet</Text>}
        />
      )}
      <FAB icon="plus" style={styles.fab} color="#fff" onPress={() => navigation.navigate('ServiceForm')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  heading: { fontSize: 16, fontWeight: '600', marginHorizontal: 16, marginTop: 16 },
  empty: { textAlign: 'center', marginTop: 40, color: colors.muted },
  fab: { position: 'absolute', right: 20, bottom: 20, backgroundColor: colors.primary },
});
