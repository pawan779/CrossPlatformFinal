import { useFonts } from "expo-font";
import React from "react";
import {
  Text,
  StyleSheet,
  useWindowDimensions,
  StyleProp,
  ViewStyle,
  TextStyle,
  TextProps,
} from "react-native";

interface TypographyProps {
  variant?: "heading" | "subheading" | "body" | "button";
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
  textProps?: TextProps;
}

const Typography: React.FC<TypographyProps> = ({
  variant,
  style,
  children,
  textProps,
}) => {
  const windowWidth = useWindowDimensions().width;

  const getFontSize = () => {
    switch (variant) {
      case "heading":
        return Math.round(windowWidth * 0.05);
      case "subheading":
        return Math.round(windowWidth * 0.045);
      case "body":
        return Math.round(windowWidth * 0.04);
      case "button":
        return Math.round(windowWidth * 0.045);
      default:
        return Math.round(windowWidth * 0.03);
    }
  };

  const getFontWeight = () => {
    switch (variant) {
      case "heading":
        return "bold";
      case "subheading":
        return "bold";
      case "body":
        return "normal";
      case "button":
        return "bold";
      default:
        return "normal";
    }
  };

  const fontSize = getFontSize();
  const fontWeight = getFontWeight();

  return (
    <Text style={[styles.text, { fontSize, fontWeight }, style]} {...textProps}>
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
