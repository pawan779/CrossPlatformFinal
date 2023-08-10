import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import CustomInput from "../../components/common/CustomInput";
import Header from "../../components/common/Header";

// You'll need to install and import the required libraries for Google and Facebook login
// import { GoogleSignin, statusCodes } from 'react-native-google-signin';
// import { LoginManager, AccessToken } from 'react-native-fbsdk';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Implement your login logic here, using the entered email and password
  };

  const handleForgotPassword = () => {
    // Implement forgot password logic
  };

  const handleRegister = () => {
    // Implement registration logic
  };

  const handleGoogleLogin = async () => {
    // Implement Google login logic using react-native-google-signin
    // Make sure you have set up your credentials and configurations for Google Sign-In
    // For example:
    // try {
    //   await GoogleSignin.hasPlayServices();
    //   const userInfo = await GoogleSignin.signIn();
    //   // Use userInfo to handle the user data returned by Google
    // } catch (error) {
    //   if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //     // user cancelled the login flow
    //   } else if (error.code === statusCodes.IN_PROGRESS) {
    //     // operation (e.g., sign in) is in progress already
    //   } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //     // play services not available or outdated
    //   } else {
    //     // some other error happened
    //   }
    // }
  };

  const handleFacebookLogin = async () => {
    // Implement Facebook login logic using react-native-fbsdk
    // Make sure you have set up your configurations for Facebook login
    // For example:
    // try {
    //   const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    //   if (result.isCancelled) {
    //     // user cancelled the login process
    //   } else {
    //     const data = await AccessToken.getCurrentAccessToken();
    //     if (!data) {
    //       // something went wrong obtaining the access token
    //     } else {
    //       const accessToken = data.accessToken;
    //       // Use the access token to handle user data returned by Facebook
    //     }
    //   }
    // } catch (error) {
    //   // Handle other errors
    // }
  };

  return (
    <View style={styles.container}>
      {/* Add your logo or other UI elements here */}

      <View style={styles.container1}>
        <TouchableOpacity
          style={styles.googleLoginButton}
          onPress={handleGoogleLogin}
        >
          <Text style={styles.googleLoginButtonText}>Login with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.facebookLoginButton}
          onPress={handleFacebookLogin}
        >
          <Text style={styles.facebookLoginButtonText}>
            Login with Facebook
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  loginButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  loginButtonText: {
    color: "#ffffff",
    fontSize: 16,
  },
  forgotPasswordText: {
    marginTop: 10,
    color: "#007bff",
    fontSize: 16,
  },
  registerText: {
    marginTop: 10,
    color: "#007bff",
    fontSize: 16,
  },
  googleLoginButton: {
    backgroundColor: "#DB4437",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  googleLoginButtonText: {
    color: "#ffffff",
    fontSize: 16,
  },
  facebookLoginButton: {
    backgroundColor: "#3B5998",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  facebookLoginButtonText: {
    color: "#ffffff",
    fontSize: 16,
  },
});

export default LoginScreen;
