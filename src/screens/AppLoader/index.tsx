import React, { useState, useEffect } from "react";
import { checkISUserLoggedIn } from "../../database/authDB/authData";
import { View } from "react-native";
import { useSelector } from "react-redux";

const AppLoader: React.FC = ({ navigation }) => {
  const id = useSelector((state) => state?.authSlice?.user?.id);

  const isUserLoggedIn = () => {
    const isLoggedIn = checkISUserLoggedIn();
    isLoggedIn && id
      ? navigation.navigate("Dashboard")
      : navigation.navigate("LoginScreen");
  };
  useEffect(() => {
    isUserLoggedIn();
  }, []);

  return <View></View>;
};

export default AppLoader;
