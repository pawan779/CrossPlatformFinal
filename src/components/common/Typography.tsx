import { useFonts } from "expo-font";
import React from "react";
import {
  Text,
  StyleSheet,
  useWindowDimensions,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";

interface TypographyProps {
  variant?: "heading" | "subheading" | "body" | "button";
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
}

export const getFontFamily = (
  variant?: "heading" | "subheading" | "body" | "button"
) => {
  switch (variant) {
    case "heading":
      return "Inter-Bold";
    case "subheading":
      return "Inter-SemiBold";
    case "body":
      return "Inter-Regular";
    case "button":
      return "Inter-Medium";
    default:
      return "Inter-Regular";
  }
};

const Typography: React.FC<TypographyProps> = ({
  variant,
  style,
  children,
}) => {
  const windowWidth = useWindowDimensions().width;

  const getFontSize = () => {
    switch (variant) {
      case "heading":
        return Math.round(windowWidth * 0.06);
      case "subheading":
        return Math.round(windowWidth * 0.05);
      case "body":
        return Math.round(windowWidth * 0.04);
      case "button":
        return Math.round(windowWidth * 0.045);
      default:
        return Math.round(windowWidth * 0.03);
    }
  };

  const fontFamily = getFontFamily(variant);
  const fontSize = getFontSize();

  return (
    <Text style={[styles.text, { fontFamily, fontSize }, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#333333",
  },
});

export default Typography;
