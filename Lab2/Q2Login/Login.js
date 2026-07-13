import React from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import Styles from './Styles';

const LoginScreen = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={Styles.container}>
        <Text style={Styles.title}>Login</Text>
        
        <TextInput
          style={Styles.input}
          placeholder="Phone"
          keyboardType="phone-pad"
        />
        
        <TextInput
          style={Styles.input}
          placeholder="Password"
          secureTextEntry
        />
        
        <TouchableOpacity style={Styles.button}>
          <Text style={Styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;