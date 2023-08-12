import { View, StyleSheet, Dimensions, Text } from "react-native";
import React, { useEffect, useState } from "react";

import Lottie from "lottie-react-native";
import { useSelector } from "react-redux";

const CustomLoader: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const isLoading = useSelector((state: any) => state?.authSlice?.isLoading);

  useEffect(() => {
    setLoading(isLoading);
  }, [loading]);

  return (
    isLoading && (
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            marginLeft: Dimensions.get("window").width / 2 - 40,
          }}
        >
          <Lottie
            style={styles.animation}
            source={require("../../../../assets/loading-rings.json")}
            autoPlay
            loop
          />
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    position: "absolute",
    zIndex: 9999999999999,
    width: "100%",
    height: "100%",
    flex: 1,
  },
  animation: {
    height: 120, // Adjust this value as needed
    width: "40%",
    flex: 1,
  },
});

export default CustomLoader;
