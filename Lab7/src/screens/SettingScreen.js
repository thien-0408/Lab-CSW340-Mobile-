import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme';

export default function SettingScreen() {
  const { logout } = useAuth();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: logout },
    ]);
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: colors.primary }}>
        <Appbar.Content title="Setting" color="#fff" />
      </Appbar.Header>
      <View style={styles.body}>
        <Button mode="contained" onPress={handleLogout} buttonColor={colors.primary} style={styles.button}>
          Logout
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  body: { padding: 16 },
  button: { borderRadius: 8, paddingVertical: 4 },
});
