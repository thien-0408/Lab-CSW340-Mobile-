/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CustomerScreen = () => (
    <SafeAreaView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
        <View>
            <Text>Customer Screen</Text>
        </View>
    </SafeAreaView>
);
export default CustomerScreen;
