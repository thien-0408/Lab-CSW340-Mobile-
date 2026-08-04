/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

const SettingScreen = ({ navigation }) => {
    const logout = async () => {
        await AsyncStorage.removeItem('@auth_token');
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <View>
                <Text>Setting Screen</Text>
                <Button title="Logout" onPress={logout} />
            </View>
        </SafeAreaView>
    );
};
export default SettingScreen;
