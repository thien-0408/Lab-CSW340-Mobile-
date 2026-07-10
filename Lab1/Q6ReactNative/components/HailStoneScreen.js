import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
} from "react-native";

export default function HailstoneScreen() {
  const [inputN, setInputN] = useState("");
  const [sequence, setSequence] = useState([]);

  const computeHailstonePath = () => {
    let n = parseInt(inputN);

    if (isNaN(n) || n <= 0) {
      Alert.alert(
        "Invalid Input",
        "Please enter a positive integer where n > 0.",
      );
      return;
    }

    let pathResult = [];
    pathResult.push(n);

    while (n > 1) {
      if (n % 2 === 0) {
        n = n / 2;
      } else {
        n = n * 3 + 1;
      }
      pathResult.push(n);
    }
    setSequence(pathResult);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>4. Hailstone Sequence Tracker</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Starting Value (n > 0)"
        keyboardType="numeric"
        value={inputN}
        onChangeText={setInputN}
      />
      <Button
        title="Generate Sequence"
        onPress={computeHailstonePath}
        color="#2c5282"
      />

      {sequence.length > 0 && (
        <View style={styles.resultBox}>
          <Text style={styles.bold}>Generated Step Chain Output:</Text>
          <Text style={styles.sequenceText}>{sequence.join(" → ")}</Text>
        </View>
      )}
    </ScrollView>
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
  sequenceText: {
    fontSize: 14,
    color: "#234e52",
    marginTop: 8,
    lineHeight: 22,
  },
});
