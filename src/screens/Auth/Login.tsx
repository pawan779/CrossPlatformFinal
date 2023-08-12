import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Common } from "../../components/common";
import Button from "../../components/common/Button";
import Typography from "../../components/common/Typography";
import { StatusBar } from "expo-status-bar";
import CommonTextInput from "../../components/common/CustomInput";
import * as authDb from "../../database/authDB";
import { useDispatch } from "react-redux";
import { loginUserAction } from "../../redux/authSlice";

interface FormData {
  email: string;
  password: string;
}

interface ErrorData {
  email: boolean;
  password: boolean;
}

const LoginScreen: React.FC = (props: any) => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorData, setErrorData] = useState<ErrorData>({
    email: false,
    password: false,
  });

  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleChange = (key: keyof FormData, value: string) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
    setErrorData((prevErrorData) => ({ ...prevErrorData, [key]: false }));
  };

  const checkValidation = () => {
    // Implement your login logic here
    if (formData.email === "" || formData.password === "") {
      setErrorData({
        email: true,
        password: true,
      });
    } else {
      setErrorData({
        email: false,
        password: false,
      });
      setIsSubmit(true);
    }
  };

  const handleLogin = async () => {
    try {
      const user = await authDb.loginUser(formData);
      dispatch(loginUserAction(user));
      props.navigation.navigate("Dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSubmit) {
      handleLogin();
      setIsSubmit(false);
    }
  }, [isSubmit]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.container1}>
        <Text style={styles.title}>Login</Text>
        <CommonTextInput
          placeholder="Email"
          value={formData.email}
          onChangeText={(text) => handleChange("email", text)}
          error={errorData.email}
          keyboardType="email-address"
          errorMessage="Please enter a valid email address"
        />

        <CommonTextInput
          placeholder="Password"
          value={formData.password}
          onChangeText={(text) => handleChange("password", text)}
          error={errorData.password}
          secureTextEntry={true}
          errorMessage="Please enter a valid password"
        />
        <Button
          label="Login"
          style={styles.loginButton}
          onPress={checkValidation}
        />
      </View>
      <View style={styles.bottomTxtStyle}>
        <Typography variant="body">Don't have an account? </Typography>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("RegisterScreen")}
        >
          <Typography variant="body" style={{ color: Common.Colors.black }}>
            Sign up
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomTxtStyle: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 20,
  },
  container1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  loginButton: {
    backgroundColor: Common.Colors.black,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
});

export default LoginScreen;
