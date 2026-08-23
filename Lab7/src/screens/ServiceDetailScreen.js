import React, { useCallback, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Appbar, Text, ActivityIndicator, Menu } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { getService, deleteService } from '../api/services';
import { colors } from '../theme';
import { formatCurrency, formatDateTime } from '../utils/format';

export default function ServiceDetailScreen({ route, navigation }) {
  const { id } = route.params;
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);

  const load = async () => {
    try {
      const data = await getService(id);
      setService(data);
    } catch (err) {
      Alert.alert('Error', 'Failed to load service');
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
      'Warning',
      'Are you sure you want to remove this service? This operation cannot be returned',
      [
        { text: 'CANCEL', style: 'cancel' },
        {
          text: 'DELETE',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteService(id);
              navigation.goBack();
            } catch (err) {
              Alert.alert('Error', 'Failed to delete service');
            }
          },
        },
      ]
    );
  };

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} color={colors.primary} />;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Appbar.Header style={{ backgroundColor: colors.primary }}>
        <Appbar.BackAction color="#fff" onPress={() => navigation.goBack()} />
        <Appbar.Content title="Service detail" color="#fff" />
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={<Appbar.Action icon="dots-vertical" color="#fff" onPress={() => setMenuVisible(true)} />}
        >
          <Menu.Item
            onPress={() => {
              setMenuVisible(false);
              navigation.navigate('ServiceForm', { id });
            }}
            title="Edit"
          />
          <Menu.Item onPress={confirmDelete} title="Delete" />
        </Menu>
      </Appbar.Header>
      <View style={styles.body}>
        <Text style={styles.row}>
          <Text style={styles.label}>Service name: </Text>
          {service?.name}
        </Text>
        <Text style={styles.row}>
          <Text style={styles.label}>Price: </Text>
          {formatCurrency(service?.price)}
        </Text>
        <Text style={styles.row}>
          <Text style={styles.label}>Time: </Text>
          {formatDateTime(service?.createdAt)}
        </Text>
        <Text style={styles.row}>
          <Text style={styles.label}>Final update: </Text>
          {formatDateTime(service?.updatedAt)}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  body: { padding: 16 },
  row: { marginBottom: 10, fontSize: 14 },
  label: { fontWeight: '700' },
});
