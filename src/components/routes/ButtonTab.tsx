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
import ProfileScreen from "../../screens/Profile";
import AddPost from "../../screens/Post";

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
                backgroundColor: focused ? Common.Colors.white : "transparent",
                padding: 7,
                borderTopStartRadius: 10,
                borderBottomEndRadius: 10,
              }}
            >
              <MaterialCommunityIcons
                name={iconName}
                size={25}
                color={focused ? Common.Colors.black : Common.Colors.white}
              />
            </View>
          );
        },
        tabBarActiveTintColor: styles.mainColor,
        tabBarInactiveTintColor: styles.greyColor,
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {
          backgroundColor: "#000",
          height: 70,
          paddingBottom: 10,
          // border: "none",
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Post" component={AddPost} />
      <Tab.Screen name="Notification" component={Home} />
      <Tab.Screen name="More" component={ProfileScreen} />
      {/* Add other screens as needed */}
    </Tab.Navigator>
  );
};

export default ButtonTab;
