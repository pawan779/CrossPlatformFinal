import React, { useState, useEffect } from "react";
import { checkISUserLoggedIn } from "../../database/authDB/authData";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { stopLoadingAction } from "../../redux/authSlice";

const AppLoader: React.FC = (props: any) => {
  const id = useSelector((state) => state?.authSlice?.user?.id);

  const dispatch = useDispatch();

  const isUserLoggedIn = () => {
    const isLoggedIn = checkISUserLoggedIn();
    isLoggedIn && id
      ? props.navigation.navigate("Dashboard")
      : props.navigation.navigate("LoginScreen");

    dispatch(stopLoadingAction());
  };
  useEffect(() => {
    isUserLoggedIn();
  }, []);

  return <View></View>;
};

export default AppLoader;
