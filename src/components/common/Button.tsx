import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  View,
} from "react-native";
import { Colors } from "./Colors";
import { Common } from ".";

interface ButtonProps extends TouchableOpacityProps {
  variant?: "primary" | "secondary";
  label: string;
  size?: "small" | "large";
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  label,
  size = "large",
  ...props
}) => {
  const buttonStyles =
    variant === "primary" ? styles.primaryButton : styles.secondaryButton;
  const textStyles =
    variant === "primary"
      ? styles.primaryButtonText
      : styles.secondaryButtonText;

  const buttonSize = size === "small" ? styles.smallButton : styles.button;

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={[buttonSize, buttonStyles]} {...props}>
        <Text style={[styles.buttonText, textStyles]}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
    // width: "100%",
  },
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
  },
  primaryButton: {
    backgroundColor: Colors.primary,
  },
  secondaryButton: {
    backgroundColor: Colors.secondary,
  },
  buttonText: {
    color: Common.Colors.white,
    fontSize: 16,
  },
  primaryButtonText: {
    // Additional styles for the primary button text, if needed
  },
  secondaryButtonText: {
    // Additional styles for the secondary button text, if needed
  },
  smallButton: {
    width: "auto",
  },
});

export default Button;
