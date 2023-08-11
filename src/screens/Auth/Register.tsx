import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Common } from "../../components/common";
import Button from "../../components/common/Button";
import Typography from "../../components/common/Typography";
import { StatusBar } from "expo-status-bar";
import Header from "../../components/common/Header";
import CommonTextInput from "../../components/common/CustomInput";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

interface ErrorData {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
  phoneNumber: boolean;
  password: boolean;
  confirmPassword: boolean;
}

const RegisterScreen: React.FC = ({ navigation }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errorData, setErrorData] = useState<ErrorData>({
    firstName: false,
    lastName: false,
    email: false,
    phoneNumber: false,
    password: false,
    confirmPassword: false,
  });

  const handleRegister = () => {
    // Implement your registration logic here
    // You can validate the form data, passwords, etc.
    // For this example, I'll focus on error handling only
    const newErrorData = {} as ErrorData;
    for (const key in formData) {
      if (formData[key] === "") {
        newErrorData[key] = true;
      }
    }
    setErrorData(newErrorData);
  };

  const handleChange = (key: keyof FormData, value: string) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
    setErrorData((prevErrorData) => ({ ...prevErrorData, [key]: false }));
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header title="Register" />
      <View style={styles.container1}>
        <CommonTextInput
          placeholder="First Name"
          value={formData.firstName}
          onChangeText={(text) => handleChange("firstName", text)}
          error={errorData.firstName}
        />

        <CommonTextInput
          placeholder="Last Name"
          value={formData.lastName}
          onChangeText={(text) => handleChange("lastName", text)}
          error={errorData.lastName}
        />

        <CommonTextInput
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChangeText={(text) => handleChange("phoneNumber", text)}
          error={errorData.phoneNumber}
          keyboardType="phone-pad"
        />

        <CommonTextInput
          placeholder="Email"
          value={formData.email}
          onChangeText={(text) => handleChange("email", text)}
          error={errorData.email}
          keyboardType="email-address"
        />

        <CommonTextInput
          placeholder="Password"
          value={formData.password}
          onChangeText={(text) => handleChange("password", text)}
          error={errorData.password}
          secureTextEntry={true}
        />

        <CommonTextInput
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChangeText={(text) => handleChange("confirmPassword", text)}
          error={errorData.confirmPassword}
          secureTextEntry={true}
        />

        <Button
          label="Register"
          style={styles.registerButton}
          onPress={handleRegister}
        />
      </View>
      <View style={styles.bottomTxtStyle}>
        <Typography variant="body">Already have an account? </Typography>
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Typography variant="body" style={{ color: Common.Colors.black }}>
            Login
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
  container1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  registerButton: {
    backgroundColor: Common.Colors.black,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  bottomTxtStyle: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default RegisterScreen;
