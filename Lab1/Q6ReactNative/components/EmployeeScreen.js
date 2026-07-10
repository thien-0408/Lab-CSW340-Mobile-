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

// CHILD COMPONENT: Receives data through 'props'
function EmployeeDisplay(props) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Registered Employee Details</Text>
      <Text style={styles.cardText}>
        <Text style={styles.bold}>Name:</Text> {props.name}
      </Text>
      <Text style={styles.cardText}>
        <Text style={styles.bold}>Age:</Text> {props.age}
      </Text>
      <Text style={styles.cardText}>
        <Text style={styles.bold}>Occupation:</Text> {props.occupation}
      </Text>
      <Text style={styles.cardText}>
        <Text style={styles.bold}>Specialization:</Text> {props.specialization}
      </Text>
    </View>
  );
}

// MAIN COMPONENT: Manages the Form State
export default function EmployeeScreen() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [occupation, setOccupation] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [previewData, setPreviewData] = useState(null);

  const handleUpdate = () => {
    if (!name || !age || !occupation || !specialization) {
      Alert.alert("Error", "Please complete all fields.");
      return;
    }
    // Set the state object to pass down as props
    setPreviewData({ name, age, occupation, specialization });
    Alert.alert("Success", "Employee information updated successfully!");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>1. Employee Information Entry</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />
      <TextInput
        style={styles.input}
        placeholder="Occupation"
        value={occupation}
        onChangeText={setOccupation}
      />
      <TextInput
        style={styles.input}
        placeholder="Specialized Training"
        value={specialization}
        onChangeText={setSpecialization}
      />

      <Button
        title="Update Information"
        onPress={handleUpdate}
        color="#2b6cb0"
      />

      {previewData !== null && (
        <EmployeeDisplay
          name={previewData.name}
          age={previewData.age}
          occupation={previewData.occupation}
          specialization={previewData.specialization}
        />
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
  card: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#ebf8ff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#bee3f8",
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#2b6cb0",
    marginBottom: 8,
  },
  cardText: { fontSize: 14, color: "#2d3748", marginVertical: 2 },
});
