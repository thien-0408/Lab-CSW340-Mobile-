import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";

export default function MinimumFinderScreen() {
  const [val1, setVal1] = useState("");
  const [val2, setVal2] = useState("");
  const [val3, setVal3] = useState("");
  const [minResult, setMinResult] = useState("");

  const handleFindMinimum = () => {
    if (!val1 || !val2 || !val3) {
      Alert.alert("Error", "Please input values into all three slots.");
      return;
    }

    const n1 = parseFloat(val1);
    const n2 = parseFloat(val2);
    const n3 = parseFloat(val3);

    setMinResult(Math.min(n1, n2, n3));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>3. Find Minimum of Three Numbers</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter First Number"
        keyboardType="numeric"
        value={val1}
        onChangeText={setVal1}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Second Number"
        keyboardType="numeric"
        value={val2}
        onChangeText={setVal2}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Third Number"
        keyboardType="numeric"
        value={val3}
        onChangeText={setVal3}
      />

      <Button
        title="Determine Minimum Value"
        onPress={handleFindMinimum}
        color="#2b6cb0"
      />

      {minResult !== "" && (
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>
            The Minimum Number is: <Text style={styles.bold}>{minResult}</Text>
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
