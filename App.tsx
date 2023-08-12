import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Text, View } from "react-native";
import AppLoader from "./src/components/appLoader/AppLoader";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/components/routes/Routes";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";

export default function App() {
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <StatusBar style={Platform.OS == "ios" ? "light" : "auto"} />
        {/* <AppLoader /> */}
        <SafeAreaView edges={["top"]} style={styles.container}>
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </SafeAreaView>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
