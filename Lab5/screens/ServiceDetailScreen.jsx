/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useLayoutEffect, useCallback } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const ServiceDetailScreen = ({ route, navigation }) => {
    const { serviceId } = route.params;
    const [service, setService] = useState(null);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Menu>
                    <MenuTrigger>
                        <Icon
                            name="ellipsis-vertical"
                            size={24}
                            color="white"
                            style={{ marginRight: 10 }}
                        />
                    </MenuTrigger>
                    <MenuOptions>
                        <MenuOption onSelect={() => handleUpdate()}>
                            <Text style={{ padding: 10, fontSize: 16 }}>
                                Update
                            </Text>
                        </MenuOption>
                        <MenuOption onSelect={() => handleDelete()}>
                            <Text style={{ padding: 10, fontSize: 16 }}>
                                Delete
                            </Text>
                        </MenuOption>
                    </MenuOptions>
                </Menu>
            ),
        });
    }, [navigation, service]);

    const handleDelete = async () => {
        const token = await AsyncStorage.getItem('@auth_token');
        Alert.alert(
            'Warning',
            'Are you sure you want to remove this service?',
            [
                { text: 'CANCEL', style: 'cancel' },
                {
                    text: 'DELETE',
                    onPress: async () => {
                        try {
                            await fetch(
                                `https://kami-backend-5rs0.onrender.com/services/${serviceId}`,
                                {
                                    method: 'DELETE',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: `Bearer ${token}`,
                                    },
                                    body: JSON.stringify({
                                        id: service._id,
                                    }),
                                },
                            );
                            navigation.goBack();
                        } catch (e) {
                            console.log(e);
                        }
                    },
                },
            ],
        );
    };

    const handleUpdate = () => {
        navigation.navigate('UpdateService', { serviceData: service });
    };

    useFocusEffect(
        useCallback(() => {
            fetchServicesById();
        }, [serviceId]),
    );

    const fetchServicesById = async () => {
        try {
            const respone = await fetch(
                `https://kami-backend-5rs0.onrender.com/services/${serviceId}`,
            );
            if (!respone.ok) {
                throw new Error('Fail to get service data');
            }
            const data = await respone.json();
            setService(data);
        } catch (err) {
            Alert.alert(err);
        }
    };

    if (!service) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <Text>Đang tải dữ liệu...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View>
                <Text>
                    <Text style={styles.title}>Service name: </Text>
                    {service.name}
                </Text>
                <Text>
                    <Text style={styles.title}>Price: </Text>
                    {service.price}
                </Text>
                <Text>
                    <Text style={styles.title}>Creator: </Text>
                    {service.user.name}
                </Text>
                <Text>
                    <Text style={styles.title}>Time: </Text>
                    {service.createdAt}
                </Text>
                <Text>
                    <Text style={styles.title}>Final update: </Text>
                    {service.updatedAt}
                </Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
    },
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
    },
});

export default ServiceDetailScreen;
