/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useState } from 'react';
import {
    Text,
    View,
    Alert,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import logo from '../assets/logo.jpg';
import { useFocusEffect } from '@react-navigation/native';

const API_SERVICES_URL = 'https://kami-backend-5rs0.onrender.com/services';

const HomeScreen = ({ navigation }) => {
    const [services, setServices] = useState([]);

    useFocusEffect(
        useCallback(() => {
            fetchServices();
        }, []),
    );

    const fetchServices = async () => {
        try {
            const response = await axios.get(API_SERVICES_URL);
            setServices(response.data);
        } catch (err) {
            const errorMessage =
                err.response?.data?.message ||
                err.message ||
                'Fail to get services data';
            Alert.alert('Lỗi', errorMessage);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerBar}>
                <Text
                    style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}
                >
                    HUYỀN TRINH
                </Text>
                <Icon name="person-circle-outline" size={30} color="white" />
            </View>
            <View style={styles.container}>
                <Image source={logo} style={styles.logo} />

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingHorizontal: 10,
                    }}
                >
                    <Text style={{ fontWeight: 'bold' }}>
                        Danh sách dịch vụ
                    </Text>
                    <TouchableOpacity
                        style={styles.addBtn}
                        onPress={() => navigation.navigate('AddService')}
                    >
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 30,
                                marginVertical: 'auto',
                                marginHorizontal: 'auto',
                            }}
                        >
                            +
                        </Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    style={{ flex: 1, marginTop: 10 }}
                    data={services}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                style={styles.servicesContainter}
                                onPress={() =>
                                    navigation.navigate('ServiceDetail', {
                                        serviceId: item._id,
                                    })
                                }
                            >
                                <View style={{ flex: 1 }}>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            fontSize: 18,
                                        }}
                                        numberOfLines={1}
                                    >
                                        {item.name}
                                    </Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 18 }}>
                                        {item.price} đ
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    headerBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#d92b68',
        paddingHorizontal: 15,
        paddingVertical: 10,
        width: '100%',
    },
    logo: {
        width: 'auto',
        height: 100,
        marginVertical: 10,
    },
    addBtn: {
        width: 40,
        height: 40,
        backgroundColor: '#d92b68',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    servicesContainter: {
        borderWidth: 1,
        borderColor: '#bdbcb9',
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 7,
        borderRadius: 10,
    },
    container: {
        flex: 1,
        width: '90%',
    },
});

export default HomeScreen;
