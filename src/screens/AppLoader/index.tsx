import React, { useState, useEffect } from "react";
import { checkISUserLoggedIn } from "../../database/authDB/authData";
import { View } from "react-native";

const AppLoader: React.FC = ({ navigation }) => {
  const isUserLoggedIn = () => {
    const isLoggedIn = checkISUserLoggedIn();
    isLoggedIn
      ? navigation.navigate("Dashboard")
      : navigation.navigate("LoginScreen");
  };
  useEffect(() => {
    isUserLoggedIn();
  }, []);

  return <View></View>;
};

export default AppLoader;
