import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";

export default function DigitSumScreen() {
  const [numberInput, setNumberInput] = useState("");
  const [result, setResult] = useState("");

  const handleCalculateSum = () => {
    if (!numberInput) {
      Alert.alert("Error", "Please enter a multi-digit number.");
      return;
    }

    // Grab string positions directly using indices
    const firstDigit = parseInt(numberInput[0]);
    const lastDigit = parseInt(numberInput[numberInput.length - 1]);

    setResult(firstDigit + lastDigit);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>2. First & Last Digit Sum Calculator</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter any multi-digit number"
        keyboardType="numeric"
        value={numberInput}
        onChangeText={setNumberInput}
      />
      <Button
        title="Calculate Sum"
        onPress={handleCalculateSum}
        color="#2c5282"
      />

      {result !== "" && (
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>
            Calculated Sum: <Text style={styles.bold}>{result}</Text>
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2d3748",
    marginBottom: 15,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#cbd5e0",
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
    fontSize: 15,
  },
  bold: { fontWeight: "bold" },
  resultBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#e6fffa",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#b2f5ea",
  },
  resultText: { fontSize: 15, color: "#234e52" },
});
