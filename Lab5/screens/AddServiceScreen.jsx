/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Alert,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

const API_URL = 'https://kami-backend-5rs0.onrender.com/services';
const TOKEN_KEY = '@auth_token';

const AddServiceScreen = () => {
    const [serviceName, setServiceName] = useState('');
    const [servicePrice, setServicePrice] = useState('');

    const handleAddService = async () => {
        if (!serviceName || !servicePrice) {
            Alert.alert('Error', 'Please fill both fields');
            return;
        }

        try {
            const token = await AsyncStorage.getItem(TOKEN_KEY);
            if (!token) {
                Alert.alert('Error', 'Can not find login token');
                return;
            }
            await axios.post(
                API_URL,
                {
                    name: serviceName,
                    price: Number(servicePrice),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            Alert.alert('Success', 'A new service has been added!!');
            setServicePrice('');
            setServiceName('');
        } catch (err) {
            const errorMessage =
                err.response?.data?.message ||
                err.message ||
                'Fail to add a new service';

            Alert.alert('Error', errorMessage);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View
                style={{
                    flex: 1,
                    paddingHorizontal: 20,
                }}
            >
                <Text style={styles.label}>Service name *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Input a service name"
                    value={serviceName}
                    placeholderTextColor="#666"
                    onChangeText={setServiceName}
                />

                <Text style={styles.label}>Price *</Text>
                <TextInput
                    style={styles.input}
                    value={String(servicePrice)}
                    onChangeText={setServicePrice}
                    placeholderTextColor="#666"
                    placeholder="Service Price"
                    keyboardType="numeric"
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleAddService}
                >
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        marginTop: 10,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'black',
        fontSize: 16,
    },
    input: {
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#d92b68',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default AddServiceScreen;
