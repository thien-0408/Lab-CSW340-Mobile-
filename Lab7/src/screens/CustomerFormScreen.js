import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Appbar, TextInput, Button, Text, ActivityIndicator } from 'react-native-paper';
import { addCustomer, getCustomer, updateCustomer } from '../api/customers';
import { colors } from '../theme';

export default function CustomerFormScreen({ route, navigation }) {
  const id = route.params?.id;
  const isEdit = !!id;
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      try {
        const data = await getCustomer(id);
        setName(data?.name || '');
        setPhone(data?.phone || '');
      } catch (err) {
        Alert.alert('Error', 'Failed to load customer');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim()) {
      Alert.alert('Validation', 'Name and phone are required');
      return;
    }
    setSaving(true);
    try {
      if (isEdit) {
        await updateCustomer(id, name.trim(), phone.trim());
      } else {
        await addCustomer(name.trim(), phone.trim());
      }
      navigation.goBack();
    } catch (err) {
      Alert.alert('Error', err?.response?.data?.message || 'Failed to save customer');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} color={colors.primary} />;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Appbar.Header style={{ backgroundColor: colors.primary }}>
        <Appbar.BackAction color="#fff" onPress={() => navigation.goBack()} />
        <Appbar.Content title="Add customer" color="#fff" />
      </Appbar.Header>
      <View style={styles.form}>
        <Text style={styles.label}>Customer name *</Text>
        <TextInput
          mode="outlined"
          placeholder="Input your customer's name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <Text style={styles.label}>Phone *</Text>
        <TextInput
          mode="outlined"
          placeholder="Input phone number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
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
