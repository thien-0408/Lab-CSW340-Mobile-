import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Appbar, TextInput, Button, Text, ActivityIndicator } from 'react-native-paper';
import { addService, getService, updateService } from '../api/services';
import { colors } from '../theme';

export default function ServiceFormScreen({ route, navigation }) {
  const id = route.params?.id;
  const isEdit = !!id;
  const [name, setName] = useState('');
  const [price, setPrice] = useState('0');
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      try {
        const data = await getService(id);
        setName(data?.name || '');
        setPrice(String(data?.price ?? 0));
      } catch (err) {
        Alert.alert('Error', 'Failed to load service');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleSubmit = async () => {
    if (!name.trim()) {
      Alert.alert('Validation', 'Service name is required');
      return;
    }
    setSaving(true);
    try {
      if (isEdit) {
        await updateService(id, name.trim(), Number(price) || 0);
      } else {
        await addService(name.trim(), Number(price) || 0);
      }
      navigation.goBack();
    } catch (err) {
      Alert.alert('Error', err?.response?.data?.message || 'Failed to save service');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} color={colors.primary} />;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Appbar.Header style={{ backgroundColor: colors.primary }}>
        <Appbar.BackAction color="#fff" onPress={() => navigation.goBack()} />
        <Appbar.Content title="Service" color="#fff" />
      </Appbar.Header>
      <View style={styles.form}>
        <Text style={styles.label}>Service name *</Text>
        <TextInput
          mode="outlined"
          placeholder="Input a service name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <Text style={styles.label}>Price *</Text>
        <TextInput
          mode="outlined"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
          style={styles.input}
        />
        <Button mode="contained" onPress={handleSubmit} loading={saving} buttonColor={colors.primary} style={styles.button}>
          {isEdit ? 'Update' : 'Add'}
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  form: { padding: 16 },
  label: { fontWeight: '600', marginBottom: 6, marginTop: 12 },
  input: { backgroundColor: colors.surface },
  button: { marginTop: 24, borderRadius: 8, paddingVertical: 4 },
});
