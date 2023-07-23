import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Text, View } from "react-native";
import AppLoader from "./src/components/appLoader/AppLoader";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/components/routes/Routes";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style={Platform.OS == "ios" ? "light" : "auto"} />
      <SafeAreaView edges={["top"]} style={styles.container}>
        <NavigationContainer>
          <AppLoader />
          <Routes />
        </NavigationContainer>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
