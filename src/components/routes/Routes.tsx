import { createStackNavigator } from "@react-navigation/stack";
import Home from "../../screens/Home";
import React from "react";
import ButtonTab from "./ButtonTab";

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
      {/* <Stack.Screen name="Home" component={Home} /> */}
    </Stack.Navigator>
  );
};

export default Routes;
