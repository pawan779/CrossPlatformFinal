import { createStackNavigator } from "@react-navigation/stack";
import Home from "../../screens/Home";
import React, { useEffect } from "react";
import ButtonTab from "./ButtonTab";
import LoginScreen from "../../screens/Auth/Login";
import ProfileScreen from "../../screens/Profile";
import UpdateProfile from "../../screens/Profile/UpdateProfile";
import RegisterScreen from "../../screens/Auth/Register";
import { checkISUserLoggedIn } from "../../database/authDB/authData";
import AppLoader from "../../screens/AppLoader";

const Stack = createStackNavigator();

const Routes: React.FC = () => {
  useEffect(() => {
    checkISUserLoggedIn();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
      }}
    >
      <Stack.Screen name="AppLoader" component={AppLoader} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="Dashboard" component={ButtonTab} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="UpdateProfileScreen" component={UpdateProfile} />
      {/* <Stack.Screen name="Home" component={Home} /> */}
    </Stack.Navigator>
  );
};

export default Routes;
