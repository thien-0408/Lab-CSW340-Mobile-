import * as Device from 'expo-device';
import { Platform, StyleSheet, Text, View, StatusBar,
  useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import MyBottomNavigation from '../components/BottomNavigation'
export default function HomeScreen() {
  const isDarkMode = useColorScheme() === "dark";

  return (
          <SafeAreaProvider>
              <SafeAreaView style={styles.safeArea}>
                  <StatusBar
                      barStyle={isDarkMode ? "light-content" : "dark-content"}
                      backgroundColor="transparent"
                      translucent={true}
                  />
                  <MyBottomNavigation />
              </SafeAreaView>
          </SafeAreaProvider>
      );
}
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
