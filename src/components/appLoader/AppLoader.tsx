import React, { useCallback } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Typography from "../common/Typography";
import Button from "../common/Button";

SplashScreen.preventAutoHideAsync();

const loadFonts = () => {
  return useFonts({
    "Inter-Regular": require("../../../assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("../../../assets/fonts/Inter-Medium.ttf"),
    "Inter-SemiBold": require("../../../assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Bold": require("../../../assets/fonts/Inter-Bold.ttf"),
  });
};

const AppLoader: React.FC = () => {
  // Load the fonts
  const [fontsLoaded] = loadFonts();

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AppLoader;
