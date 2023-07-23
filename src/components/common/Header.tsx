import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Constant from "expo-constants";
import { Common } from "./index";
import Typography from "./Typography";

const Header: React.FC = () => {
  return (
    <View
      style={{
        width: "100%",
        paddingTop: Constant.statusBarHeight,
        padding: 10,
        backgroundColor: Common.Colors.primary,
      }}
    >
      <Typography
        variant="subheading"
        style={{ color: "#fff", textAlign: "center" }}
      >
        Connectify
      </Typography>
    </View>
  );
};

export default Header;
const styles = StyleSheet.create({});
