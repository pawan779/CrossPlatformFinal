import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import React from "react";
import Home from "../../screens/Home";
import styles from "./styles";
import { Common } from "../common";
import { View } from "react-native";

type RoutesParamList = {
  Home: undefined;
  Post: undefined;
  Notification: undefined;
  More: undefined;
};

const ButtonTab: React.FC = () => {
  const Tab = createBottomTabNavigator<RoutesParamList>();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let iconName: string = "";
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Post") {
            iconName = "plus-circle-outline";
          } else if (route.name === "Notification") {
            iconName = "bell";
          } else {
            iconName = "menu";
          }
          return (
            <View
              style={{
                backgroundColor: focused
                  ? Common.Colors.primary
                  : "transparent",
                padding: 7,
                borderTopStartRadius: 10,
                borderBottomEndRadius: 10,
              }}
            >
              <MaterialCommunityIcons
                name={iconName}
                size={25}
                color={focused ? Common.Colors.white : Common.Colors.primary}
              />
            </View>
          );
        },
        tabBarActiveTintColor: styles.mainColor,
        tabBarInactiveTintColor: styles.greyColor,
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {
          backgroundColor: "#fff",
          //   height: 60,
          paddingBottom: 10,
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Post" component={Home} />
      <Tab.Screen name="Notification" component={Home} />
      <Tab.Screen name="More" component={Home} />
      {/* Add other screens as needed */}
    </Tab.Navigator>
  );
};

export default ButtonTab;
