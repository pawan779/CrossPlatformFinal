import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from "react-native";
import Header from "../../components/common/Header";
import { Common } from "../../components/common";
import Button from "../../components/common/Button";
import PostCard from "./components/PostCard";
import { StackNavigationProp } from "@react-navigation/stack";
import { getUserById, logoutUser } from "../../database/authDB";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserAction,
  startLoadingAction,
  stopLoadingAction,
} from "../../redux/authSlice";

import Constant from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import Typography from "../../components/common/Typography";
import { StatusBar } from "expo-status-bar";
import { CommonActions } from "@react-navigation/native";

interface UpdateProfileProps {
  navigation: StackNavigationProp<any>;
}

const ProfileScreen: React.FC<UpdateProfileProps> = ({ navigation }) => {
  const { user, isLoading } = useSelector((state: any) => state?.authSlice);
  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      dispatch(startLoadingAction());
      const data = await getUserById(user?.id);
      dispatch(getUserAction(data));
      dispatch(stopLoadingAction());
    } catch (error) {
      dispatch(stopLoadingAction());
      console.log(error);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            await logoutUser();
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "LoginScreen" }],
              })
            );
          },
        },
      ],
      { cancelable: false }
    );
  };

  const onRefresh = () => {
    getUser();
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={styles.container}>
      <Header title={"Profile"} />
      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="exit-outline" size={24} color={Common.Colors.error} />
          <Typography variant="body" style={styles.logoutTxtSty}>
            Logout
          </Typography>
        </TouchableOpacity>
      </View>
      {!isLoading && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
          }
        >
          <View style={styles.profileContainer}>
            <Image
              source={{ uri: user?.profileImage }}
              style={styles.profileImage}
            />
            <Text style={styles.username}>
              {user?.firstName + " " + user?.lastName}
            </Text>
            <View style={styles.statsContainer}>
              {/* <View style={styles.statsItem}>
                <Text style={styles.statsText}>{user?.followerCount}</Text>
                <Text style={styles.statsLabel}>Followers</Text>
              </View>
              <View style={styles.statsItem}>
                <Text style={styles.statsText}>{user?.followingCount}</Text>
                <Text style={styles.statsLabel}>Following</Text>
              </View> */}
              <View style={styles.statsItem}>
                <Text style={styles.statsText}>{user?.postData?.length}</Text>
                <Text style={styles.statsLabel}>Posts</Text>
              </View>
            </View>
            <Button
              label="Update Profile"
              onPress={() => navigation.navigate("UpdateProfileScreen")}
            />

            <Text style={styles.bio}>Bio: {user.bio}</Text>
          </View>

          <PostCard postData={user?.postData} />
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  logoutTxtSty: {
    fontSize: 12,
    fontWeight: "bold",
    color: Common.Colors.error,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  profileContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingVertical: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 75,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: Common.Colors.primary,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginVertical: 15,
  },
  statsItem: {
    alignItems: "center",
  },
  statsText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  statsLabel: {
    fontSize: 12,
  },
  bio: {
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  logoutContainer: {
    position: "absolute",
    top: Constant.statusBarHeight,
    right: 10,
    zIndex: 2,
  },
  logoutButton: {
    paddingRight: 10,
    alignItems: "center",
  },
});

export default ProfileScreen;
