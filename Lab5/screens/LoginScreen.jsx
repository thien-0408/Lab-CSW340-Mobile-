/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { TextInput } from 'react-native-paper';

const TOKEN_KEY = '@auth_token';
const API_URL = 'https://kami-backend-5rs0.onrender.com/auth';

const LoginScreen = ({ navigation }) => {
    const [phone, setPhone] = useState('');
    const [pass, setPass] = useState('');
    const [loading, setLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(true);

    const handleLogin = async () => {
        if (!phone || !pass) {
            Alert.alert('Error', 'Phone and Password must be filed');
            return;
        }

        setLoading(true);

        try {
            const loginData = {
                phone: phone,
                password: pass,
            };

            const respone = await axios.post(API_URL, loginData);
            const token = respone.data.token;

            if (!token) {
                throw new Error('No token respone');
            }

            await AsyncStorage.setItem(TOKEN_KEY, token);
            setLoading(false);
            navigation.replace('Main');
        } catch (error) {
            setLoading(false);
            if (error.response) {
                console.error('Data:', error.response.data);
                Alert.alert(
                    'Đăng nhập thất bại',
                    error.response.data.message || 'Sai thông tin',
                );
            } else if (error.request) {
                Alert.alert(
                    'Lỗi',
                    'Không thể kết nối đến server. Vui lòng kiểm tra mạng.',
                );
            } else {
                Alert.alert('Lỗi', error.message);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.login}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Phone"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                mode="outlined"
                theme={{ roundness: 15 }}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                value={pass}
                onChangeText={setPass}
                mode="outlined"
                theme={{ roundness: 15 }}
                secureTextEntry={isPasswordVisible}
                right={
                    <TextInput.Icon
                        icon={isPasswordVisible ? 'eye-off' : 'eye'}
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    />
                }
            />
            <TouchableOpacity
                style={styles.btn}
                onPress={handleLogin}
                disabled={loading}
            >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                    {loading ? 'Processing...' : 'Login'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#f4f4f4ff',
    },
    login: {
        marginBottom: 50,
        fontSize: 40,
        color: '#d92b68',
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    input: {
        marginVertical: 5,
        backgroundColor: 'transparent',
    },
    btn: {
        backgroundColor: '#d92b68',
        height: 50,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
});

export default LoginScreen;
