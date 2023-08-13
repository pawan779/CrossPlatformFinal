import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";

import Lottie from "lottie-react-native";
import { useSelector } from "react-redux";
import { Common } from "..";

const CustomLoader: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const isLoading = useSelector((state: any) => state?.authSlice?.isLoading);

  useEffect(() => {
    setLoading(isLoading);
  }, [loading]);

  return (
    isLoading && (
      <View style={styles.container}>
        <View style={styles.container1}>
          <ActivityIndicator size="large" color={Common.Colors.white} />
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "absolute",
    zIndex: 9999999999999,
    width: "100%",
    height: "100%",
    flex: 1,
  },
});

export default CustomLoader;
