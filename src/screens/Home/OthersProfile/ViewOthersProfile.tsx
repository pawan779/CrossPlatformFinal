import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import Header from "../../../components/common/Header";
import { Common } from "../../../components/common";
import Button from "../../../components/common/Button";
import PostCard from "../../Profile/components/PostCard";
import { StackNavigationProp } from "@react-navigation/stack";
import { followUser, getUserById } from "../../../database/authDB";
import { useDispatch, useSelector } from "react-redux";
import {
  getOtherUserAction,
  getUserAction,
  startLoadingAction,
  stopLoadingAction,
} from "../../../redux/authSlice";

interface UpdateProfileProps {
  navigation: StackNavigationProp<any>;
  route: any;
}

const ViewOthersProfile: React.FC<UpdateProfileProps> = ({
  navigation,
  route,
}) => {
  const { isLoading } = useSelector((state: any) => state?.authSlice);
  const id = useSelector((state: any) => state?.authSlice?.user?.id);
  const { user } = route?.params;
  console.log(user);
  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      dispatch(startLoadingAction());
      const data = await getUserById(user?.id);
      dispatch(getOtherUserAction(data));
      dispatch(stopLoadingAction());
    } catch (error) {
      dispatch(stopLoadingAction());
      console.log(error);
    }
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
              <View style={styles.statsItem}>
                <Text style={styles.statsText}>{user?.postData?.length}</Text>
                <Text style={styles.statsLabel}>Posts</Text>
              </View>
            </View>

            <Text style={styles.bio}>Bio: {user.bio}</Text>
          </View>

          <PostCard
            postData={user?.postData}
            user={user}
            redirectFrom="ViewOtherProfile"
          />
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default ViewOthersProfile;
