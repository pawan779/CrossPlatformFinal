import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Constant from "expo-constants";
import { Common } from "./index";
import Typography from "./Typography";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title = "Connectify" }) => {
  return (
    <View
      style={{
        width: "100%",
        paddingTop: Constant.statusBarHeight,
        padding: 10,
        backgroundColor: Common.Colors.white,
      }}
    >
      <Typography
        variant="subheading"
        style={{ color: "#000", textAlign: "center" }}
      >
        {title}
      </Typography>
    </View>
  );
};

export default Header;
const styles = StyleSheet.create({});
