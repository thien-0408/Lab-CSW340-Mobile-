import React, { useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme';

export default function LoginScreen() {
  const { login } = useAuth();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!phone || !password) {
      Alert.alert('Missing info', 'Please enter phone and password');
      return;
    }
    setLoading(true);
    try {
      await login(phone, password);
    } catch (err) {
      Alert.alert('Login failed', err?.response?.data?.message || 'Invalid phone or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        mode="outlined"
        label="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={secure}
        right={<TextInput.Icon icon={secure ? 'eye' : 'eye-off'} onPress={() => setSecure(!secure)} />}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleLogin} loading={loading} buttonColor={colors.primary} style={styles.button}>
        Login
      </Button>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: colors.background },
  title: { fontSize: 36, fontWeight: 'bold', color: colors.primary, textAlign: 'center', marginBottom: 32 },
  input: { marginBottom: 16, backgroundColor: colors.surface },
  button: { marginTop: 8, borderRadius: 8, paddingVertical: 4 },
});
