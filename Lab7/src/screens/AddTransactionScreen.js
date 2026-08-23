import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Appbar, Text, Button, ActivityIndicator } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { getCustomers } from '../api/customers';
import { getServices } from '../api/services';
import { addTransaction } from '../api/transactions';
import { colors } from '../theme';
import { formatCurrency } from '../utils/format';

export default function AddTransactionScreen({ navigation }) {
  const [customers, setCustomers] = useState([]);
  const [services, setServices] = useState([]);
  const [customerId, setCustomerId] = useState(null);
  const [selected, setSelected] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [customerData, serviceData] = await Promise.all([getCustomers(), getServices()]);
        setCustomers(Array.isArray(customerData) ? customerData : customerData?.customers || []);
        setServices(Array.isArray(serviceData) ? serviceData : serviceData?.services || []);
      } catch (err) {
        Alert.alert('Error', 'Failed to load data');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const toggleService = (id, checked) => {
    setSelected((prev) => {
      const next = { ...prev };
      if (checked) next[id] = next[id] || 1;
      else delete next[id];
      return next;
    });
  };

  const changeQuantity = (id, delta) => {
    setSelected((prev) => {
      const current = prev[id] || 1;
      const nextQty = Math.max(1, current + delta);
      return { ...prev, [id]: nextQty };
    });
  };

  const total = Object.entries(selected).reduce((sum, [id, qty]) => {
    const service = services.find((s) => s._id === id);
    return sum + (service ? service.price * qty : 0);
  }, 0);

  const handleSubmit = async () => {
    if (!customerId) {
      Alert.alert('Validation', 'Please select a customer');
      return;
    }
    const serviceIds = Object.keys(selected);
    if (serviceIds.length === 0) {
      Alert.alert('Validation', 'Please select at least one service');
      return;
    }
    setSaving(true);
    try {
      const payload = serviceIds.map((id) => ({ _id: id, quantity: selected[id] }));
      await addTransaction(customerId, payload);
      navigation.goBack();
    } catch (err) {
      Alert.alert('Error', err?.response?.data?.message || 'Failed to create transaction');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} color={colors.primary} />;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Appbar.Header style={{ backgroundColor: colors.primary }}>
        <Appbar.BackAction color="#fff" onPress={() => navigation.goBack()} />
        <Appbar.Content title="Add transaction" color="#fff" />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.label}>Customer *</Text>
        <Dropdown
          style={styles.dropdown}
          data={customers.map((c) => ({ label: `${c.name} - ${c.phone}`, value: c._id }))}
          labelField="label"
          valueField="value"
          placeholder="Select customer"
          value={customerId}
          onChange={(item) => setCustomerId(item.value)}
        />

        <Text style={[styles.label, { marginTop: 20 }]}>Services</Text>
        {services.map((service) => {
          const checked = !!selected[service._id];
          const qty = selected[service._id] || 1;
          return (
            <View key={service._id} style={styles.serviceRow}>
              <BouncyCheckbox
                isChecked={checked}
                fillColor={colors.primary}
                text={service.name}
                textStyle={{ textDecorationLine: 'none', color: colors.text }}
                onPress={(isChecked) => toggleService(service._id, isChecked)}
              />
              {checked && (
                <View style={styles.qtyRow}>
                  <Button compact mode="outlined" onPress={() => changeQuantity(service._id, -1)}>
                    -
                  </Button>
                  <Text style={styles.qty}>{qty}</Text>
                  <Button compact mode="outlined" onPress={() => changeQuantity(service._id, 1)}>
                    +
                  </Button>
                  <Text style={styles.price}>Price: {formatCurrency(service.price)}</Text>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
      <Button mode="contained" onPress={handleSubmit} loading={saving} buttonColor={colors.primary} style={styles.submit}>
        See summary: ({formatCurrency(total)})
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  body: { padding: 16, paddingBottom: 100 },
  label: { fontWeight: '600', marginBottom: 8 },
  dropdown: { borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 12, backgroundColor: colors.surface },
  serviceRow: { marginBottom: 12, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: colors.border },
  qtyRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, marginLeft: 36, gap: 8 },
  qty: { marginHorizontal: 4, fontWeight: '600' },
  price: { marginLeft: 'auto', color: colors.primary, fontWeight: '600' },
  submit: { margin: 16, borderRadius: 8, paddingVertical: 4 },
});
