import styles from './style';
import React from 'react';
import { View, Text, Alert, Button } from 'react-native';

function ClickOnTheSquare(value) {
  Alert.alert(value);
}

export default Square = ({ text }) => (
  <View style={[styles.box, { backgroundColor: '#7ce0f9' }]}>
    <Text>{text}</Text>
    <Button title="Click" onPress={() => ClickOnTheSquare(text)}></Button>
  </View>
);
