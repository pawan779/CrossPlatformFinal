import React, { ReactElement, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

interface CustomInputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  isError?: boolean;
  errorMessage?: string;
  isPassword?: boolean;
  multiline?: boolean;
  validationCheck?: ReactElement;
}

const CustomInput: React.FC<CustomInputProps> = ({
  placeholder,
  value,
  onChangeText,
  isError = true,
  errorMessage = "",
  isPassword = false,
  multiline = false,
  validationCheck,
}) => {
  const [hide, setHide] = useState<boolean>(true);

  const handleTextChange = (text: string) => {
    onChangeText(text);
  };

  const togglePasswordVisibility = () => {
    setHide(!hide);
  };

  return (
    <View style={[styles.container, { borderColor: isError ? "red" : "#000" }]}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={handleTextChange}
        style={[
          styles.input,
          { color: isError ? "#FF0000" : "#000000" },
          multiline && { height: 100 }, // Customize height for multiline inputs
        ]}
        multiline={multiline}
        secureTextEntry={isPassword && hide}
        onBlur={validationCheck}
        // onSubmitEditing={validationCheck}
      />
      {isPassword && (
        <TouchableOpacity
          style={styles.passwordToggle}
          onPress={togglePasswordVisibility}
        >
          <Text>{hide ? "Show" : "Hide"}</Text>
        </TouchableOpacity>
      )}
      {isError && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#ffffff",

    // box shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    fontSize: 16,
    fontFamily: "Arial",
    width: "90%",
    paddingVertical: 5,
    // Customize font family as per your requirement
  },

  errorText: {
    color: "#FF0000",
    marginTop: 5,
  },
});

export default CustomInput;
