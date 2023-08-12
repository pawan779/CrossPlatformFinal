import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Text, View } from "react-native";
import AppLoader from "./src/components/appLoader/AppLoader";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/components/routes/Routes";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { persistor, store } from "./src/redux/store";
import Toast from "react-native-toast-message";
import Constant from "expo-constants";
import { PersistGate } from "redux-persist/integration/react";
import CustomLoader from "./src/components/common/loading/CustomLoading";

export default function App() {
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar style={Platform.OS == "ios" ? "light" : "auto"} />
          {/* <CustomLoader /> */}
          {/* <AppLoader /> */}
          <SafeAreaView edges={["top"]} style={styles.container}>
            <NavigationContainer>
              <Routes />
            </NavigationContainer>
          </SafeAreaView>
        </PersistGate>
      </Provider>
      <Toast
        visibilityTime={5000}
        position="top"
        topOffset={Constant.statusBarHeight}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
