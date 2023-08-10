import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constant from "expo-constants";
import { Common } from "./index";
import Typography from "./Typography";
import { useNavigation } from "@react-navigation/native";

interface HeaderProps {
  title: string;
  backreq?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title = "Connectify",
  backreq = true,
}) => {
  const navigation = useNavigation();

  const onBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {backreq && (
        <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
          <Ionicons name="arrow-back" size={24} color={Common.Colors.white} />
        </TouchableOpacity>
      )}
      <Typography variant="subheading" style={styles.titleText}>
        {title}
      </Typography>
      <View style={styles.placeholder} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: Constant.statusBarHeight,
    padding: 10,
    backgroundColor: Common.Colors.primary,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    padding: 10,
  },
  titleText: {
    color: Common.Colors.white,
    textAlign: "center",
  },
  placeholder: {
    width: 24,
  },
});
