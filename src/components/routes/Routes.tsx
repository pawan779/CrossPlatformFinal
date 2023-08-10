import { createStackNavigator } from "@react-navigation/stack";
import Home from "../../screens/Home";
import React from "react";
import ButtonTab from "./ButtonTab";
import LoginScreen from "../../screens/Auth/Login";
import ProfileScreen from "../../screens/Profile";
import UpdateProfile from "../../screens/Profile/UpdateProfile";

const Stack = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
      }}
    >
      <Stack.Screen name="Tab" component={ButtonTab} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="UpdateProfileScreen" component={UpdateProfile} />
      {/* <Stack.Screen name="Home" component={Home} /> */}
    </Stack.Navigator>
  );
};

export default Routes;
