/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Alert,
    TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UpdateServiceScreen = ({ navigation, route }) => {
    const { serviceData } = route.params;

    const [name, setName] = useState(serviceData.name);
    const [price, setPrice] = useState(String(serviceData.price));

    const handleUpdateService = async () => {
        if (!name || !price) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }

        try {
            const token = await AsyncStorage.getItem('@auth_token');
            if (!token) {
                Alert.alert('Error', 'Token not found');
                return;
            }

            const response = await fetch(
                `https://kami-backend-5rs0.onrender.com/services/${serviceData._id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        name: name,
                        price: Number(price),
                    }),
                },
            );

            if (response.ok) {
                Alert.alert('Success', 'Update successfully!', [
                    {
                        text: 'OK',
                        onPress: () => {
                            navigation.goBack();
                        },
                    },
                ]);
            } else {
                const errorData = await response.json();
                Alert.alert('Error', errorData.message || 'Update failed');
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Service name *</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Input a service name"
                placeholderTextColor="#888"
            />

            <Text style={styles.label}>Price *</Text>
            <TextInput
                style={styles.input}
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                placeholderTextColor="#888"
            />

            <TouchableOpacity
                style={styles.button}
                onPress={handleUpdateService}
            >
                <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
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
        color: 'black',
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

export default UpdateServiceScreen;
