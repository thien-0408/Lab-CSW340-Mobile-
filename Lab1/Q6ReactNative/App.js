import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import EmployeeScreen from "./components/EmployeeScreen";
import DigitSumScreen from "./components/DigitSumScreen";
import MinimumFinderScreen from "./components/MinimumFinderScreen";
import HailstoneScreen from "./components/HailStoneScreen";

export default function App() {
  const [activeTab, setActiveTab] = useState("Emp");

  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* Header Container */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lab 1: Question 6 Dashboard</Text>
      </View>

      {/* Tabs Layout */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "Emp" && styles.activeTab]}
          onPress={() => setActiveTab("Emp")}
        >
          <Text
            style={[
              styles.tabLabel,
              activeTab === "Emp" && styles.activeTabText,
            ]}
          >
            P1: Form
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "Sum" && styles.activeTab]}
          onPress={() => setActiveTab("Sum")}
        >
          <Text
            style={[
              styles.tabLabel,
              activeTab === "Sum" && styles.activeTabText,
            ]}
          >
            P2: Sum
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "Min" && styles.activeTab]}
          onPress={() => setActiveTab("Min")}
        >
          <Text
            style={[
              styles.tabLabel,
              activeTab === "Min" && styles.activeTabText,
            ]}
          >
            P3: Min
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "Hail" && styles.activeTab]}
          onPress={() => setActiveTab("Hail")}
        >
          <Text
            style={[
              styles.tabLabel,
              activeTab === "Hail" && styles.activeTabText,
            ]}
          >
            P4: Path
          </Text>
        </TouchableOpacity>
      </View>

      {/* Dynamic View Panel Switcher */}
      <View style={styles.body}>
        {activeTab === "Emp" && <EmployeeScreen />}
        {activeTab === "Sum" && <DigitSumScreen />}
        {activeTab === "Min" && <MinimumFinderScreen />}
        {activeTab === "Hail" && <HailstoneScreen />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#f7fafc" },
  header: {
    height: 60,
    backgroundColor: "#2b6cb0",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#edf2f7",
    borderBottomWidth: 1,
    borderColor: "#cbd5e0",
  },
  tabButton: { flex: 1, paddingVertical: 12, alignItems: "center" },
  activeTab: {
    backgroundColor: "#fff",
    borderBottomWidth: 3,
    borderBottomColor: "#2b6cb0",
  },
  tabLabel: { fontSize: 13, fontWeight: "600", color: "#4a5568" },
  activeTabText: { color: "#2b6cb0", fontWeight: "bold" },
  body: { flex: 1, padding: 15 },
});
