import React, { useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Text style={styles.title}>Login</Text>

      <TextInput
        mode="outlined"
        label="Phone"
        placeholder="Enter your phone number"
        placeholderTextColor={colors.muted}
        textColor={colors.text}
        outlineColor={colors.border}
        activeOutlineColor={colors.primary}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        contentStyle={styles.inputContent}
        style={styles.input}
        theme={{
          colors: {
            onSurfaceVariant: colors.muted, // Màu label & placeholder
          },
        }}
      />

      <TextInput
        mode="outlined"
        label="Password"
        placeholder="Enter your password"
        placeholderTextColor={colors.muted}
        textColor={colors.text}
        outlineColor={colors.border}
        activeOutlineColor={colors.primary}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={secure}
        contentStyle={styles.inputContent}
        style={styles.input}
        theme={{
          colors: {
            onSurfaceVariant: colors.muted,
          },
        }}
        right={
          <TextInput.Icon
            icon={secure ? 'eye' : 'eye-off'}
            color={colors.muted}
            onPress={() => setSecure(!secure)}
          />
        }
      />

      <Button
        mode="contained"
        onPress={handleLogin}
        loading={loading}
        buttonColor={colors.primary}
        textColor="#FFFFFF"
        style={styles.button}
      >
        Login
      </Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 32,
  },
  input: {
    marginBottom: 16,
    backgroundColor: colors.surface,
  },
  inputContent: {
    color: colors.text, // Ép chữ người dùng gõ luôn là màu đen/tối
  },
  button: {
    marginTop: 8,
    borderRadius: 8,
    paddingVertical: 4,
    backgroundColor: colors.primary, // Đảm bảo nút luôn nhận màu đỏ/hồng thay vì màu tím mặc định
  },
});
