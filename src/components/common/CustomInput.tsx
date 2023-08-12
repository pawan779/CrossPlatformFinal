import React, { useState } from "react";
import {
  TextInput,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Common } from "./";

interface CommonTextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: boolean;
  errorMessage?: string; // New prop for error message
  secureTextEntry?: boolean;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
}

const CommonTextInput: React.FC<CommonTextInputProps> = ({
  placeholder,
  value,
  onChangeText,
  error = false,
  errorMessage = "",
  secureTextEntry = false,
  keyboardType = "default",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[styles.inputContainer, error ? styles.inputError : null]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={secureTextEntry && !showPassword}
        keyboardType={keyboardType}
        autoCapitalize="none"
      />
      {error && errorMessage && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}
      {secureTextEntry && (
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIconContainer}
        >
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color={Common.Colors.black}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    height: 40,
    borderColor: Common.Colors.border,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: "100%",
  },
  inputError: {
    borderColor: Common.Colors.error,
  },
  eyeIconContainer: {
    paddingHorizontal: 8,
  },
  errorText: {
    color: Common.Colors.error,
    fontSize: 12,
    marginTop: 4,
  },
});

export default CommonTextInput;
