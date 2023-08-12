import React, { useState, useEffect } from "react";
import {
  checkISUserLoggedIn,
  updateExpoToken,
} from "../../database/authDB/authData";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addExpoTokenAction, stopLoadingAction } from "../../redux/authSlice";
import {
  registerForPushNotificationsAsync,
  sendPushNotification,
} from "../Notification/config";

const AppLoader: React.FC = (props: any) => {
  const id = useSelector((state) => state?.authSlice?.user?.id);

  const dispatch = useDispatch();

  const isUserLoggedIn = async () => {
    const isLoggedIn = checkISUserLoggedIn();
    isLoggedIn && id
      ? props.navigation.navigate("Dashboard")
      : props.navigation.navigate("LoginScreen");

    dispatch(stopLoadingAction());
    const token: any = await registerForPushNotificationsAsync();
    dispatch(addExpoTokenAction(token?.data));
  };
  useEffect(() => {
    isUserLoggedIn();
  }, []);

  return <View></View>;
};

export default AppLoader;
