import React, { useCallback, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Appbar, Text, ActivityIndicator } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getService, deleteService } from '../api/services';
import { colors } from '../theme';
import { formatCurrency, formatDateTime } from '../utils/format';

export default function ServiceDetailScreen({ route, navigation }) {
  const { id } = route.params;
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

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
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: colors.primary }}>
        <Appbar.BackAction color="#fff" onPress={() => navigation.goBack()} />
        <Appbar.Content title="Service detail" color="#fff" />
        <Menu>
          <MenuTrigger customStyles={{ triggerWrapper: styles.menuTrigger }}>
            <MaterialCommunityIcons name="dots-vertical" size={24} color="#fff" />
          </MenuTrigger>
          <MenuOptions>
            <MenuOption onSelect={() => navigation.navigate('ServiceForm', { id })} text="Edit" />
            <MenuOption onSelect={confirmDelete} text="Delete" />
          </MenuOptions>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  menuTrigger: { paddingHorizontal: 16 },
  body: { padding: 16 },
  row: { marginBottom: 10, fontSize: 14 },
  label: { fontWeight: '700' },
});
