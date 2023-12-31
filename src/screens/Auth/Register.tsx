import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Common } from "../../components/common";
import Button from "../../components/common/Button";
import Typography from "../../components/common/Typography";
import { StatusBar } from "expo-status-bar";
import Header from "../../components/common/Header";
import CommonTextInput from "../../components/common/CustomInput";
import * as authDb from "../../database/authDB";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAction } from "../../redux/authSlice";

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface ErrorData {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
  phone: boolean;
  password: boolean;
  confirmPassword: boolean;
}

const RegisterScreen: React.FC = (props: any) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errorData, setErrorData] = useState<ErrorData>({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false,
  });

  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const dispatch = useDispatch();
  const expoToken = useSelector((state: any) => state?.authSlice?.expoToken);

  const checkValidation = () => {
    const newErrorData = {} as ErrorData;
    for (const key in formData) {
      if (formData[key] === "") {
        newErrorData[key] = true;
      }
    }

    // Validate Password
    if (formData.password.length < 8) {
      newErrorData.password = true;
    }

    // Validate Email format using a simple regular expression
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      newErrorData.email = true;
    }

    // Confirm Password
    if (formData.password !== formData.confirmPassword) {
      newErrorData.confirmPassword = true;
    }

    // Validate Phone Number
    if (formData.phone.length !== 10) {
      newErrorData.phone = true;
    }

    setErrorData(newErrorData);
    if (Object.keys(newErrorData).length === 0) {
      setIsSubmit(true);
    }
  };

  const clearForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleRegister = async () => {
    try {
      const res = await authDb.registerUser({ ...formData, expoToken });
      dispatch(registerUserAction(res));
      clearForm();
      props.navigation.navigate("Dashboard");
    } catch (error) {
      console.log("error123", error);
    }
  };

  const handleChange = (key: keyof FormData, value: string) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
    setErrorData((prevErrorData) => ({ ...prevErrorData, [key]: false }));
  };

  useEffect(() => {
    if (isSubmit) {
      handleRegister();
      setIsSubmit(false);
    }
  }, [isSubmit]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header title="Register" />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container1}>
          <CommonTextInput
            placeholder="First Name"
            value={formData.firstName}
            onChangeText={(text) => handleChange("firstName", text)}
            error={errorData.firstName}
            errorMessage="First name is required"
          />

          <CommonTextInput
            placeholder="Last Name"
            value={formData.lastName}
            onChangeText={(text) => handleChange("lastName", text)}
            error={errorData.lastName}
            errorMessage="Last name is required"
          />

          <CommonTextInput
            placeholder="Phone Number"
            value={formData.phone}
            onChangeText={(text) => handleChange("phone", text)}
            error={errorData.phone}
            keyboardType="phone-pad"
            errorMessage="Phone number should be 10 digits"
          />

          <CommonTextInput
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => handleChange("email", text)}
            error={errorData.email}
            keyboardType="email-address"
            errorMessage="Email is not valid"
          />

          <CommonTextInput
            placeholder="Password"
            value={formData.password}
            onChangeText={(text) => handleChange("password", text)}
            error={errorData.password}
            secureTextEntry={true}
            errorMessage="Password should be at least 8 characters"
          />

          <CommonTextInput
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChangeText={(text) => handleChange("confirmPassword", text)}
            error={errorData.confirmPassword}
            secureTextEntry={true}
            errorMessage="Password does not match"
          />

          <Button
            label="Register"
            style={styles.registerButton}
            onPress={checkValidation}
          />
        </View>
        <View style={styles.bottomTxtStyle}>
          <Typography variant="body">Already have an account? </Typography>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("LoginScreen")}
          >
            <Typography variant="body" style={{ color: Common.Colors.black }}>
              Login
            </Typography>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
