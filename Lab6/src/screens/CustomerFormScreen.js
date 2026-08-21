import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Appbar, TextInput, Button, Text } from 'react-native-paper';
import { addCustomer } from '../api/customers';
import { colors } from '../theme';

export default function CustomerFormScreen({ navigation }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [saving, setSaving] = useState(false);

  const handleAdd = async () => {
    if (!name.trim() || !phone.trim()) {
      Alert.alert('Validation', 'Name and phone are required');
      return;
    }
    setSaving(true);
    try {
      await addCustomer(name.trim(), phone.trim());
      navigation.goBack();
    } catch (err) {
      Alert.alert('Error', err?.response?.data?.message || 'Failed to add customer');
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
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
        <Button mode="contained" onPress={handleAdd} loading={saving} buttonColor={colors.primary} style={styles.button}>
          Add
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  form: { padding: 16 },
  label: { fontWeight: '600', marginBottom: 6, marginTop: 12 },
  input: { backgroundColor: colors.surface },
  button: { marginTop: 24, borderRadius: 8, paddingVertical: 4 },
});
