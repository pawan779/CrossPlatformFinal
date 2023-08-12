import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Header from "../../components/common/Header";
import { Common } from "../../components/common";
import Button from "../../components/common/Button";
import PostCard from "./components/PostCard";
import { StackNavigationProp } from "@react-navigation/stack";
import { getUserById } from "../../database/authDB";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserAction,
  startLoadingAction,
  stopLoadingAction,
} from "../../redux/authSlice";

interface UpdateProfileProps {
  navigation: StackNavigationProp<any>;
}

const ProfileScreen: React.FC<UpdateProfileProps> = ({ navigation }) => {
  // const [user, setUser] = React.useState({
  //   firstName: "Pawan",
  //   lastName: "Dharel",
  //   email: "pawan.dharel777@gmail.com",
  //   image: "https://source.unsplash.com/random?user",
  //   bio: " Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  //   followers: 100,
  //   following: 100,
  //   posts: 100,
  //   postData: [
  //     {
  //       id: 1,
  //       image: "https://source.unsplash.com/random?",
  //       caption: "Your post caption goes here.",
  //       likes: 100,
  //     },
  //     {
  //       id: 2,
  //       image: "https://source.unsplash.com/random?",
  //       caption: "Your post caption goes here.",
  //       likes: 100,
  //     },
  //     {
  //       id: 3,
  //       image: "https://source.unsplash.com/random?",
  //       caption: "Your post caption goes here.",
  //       likes: 100,
  //     },
  //     {
  //       id: 4,
  //       image: "https://source.unsplash.com/random?",
  //       caption: "Your post caption goes here.",
  //       likes: 100,
  //     },
  //     {
  //       id: 5,
  //       image: "https://source.unsplash.com/random?",
  //       caption: "Your post caption goes here.",
  //       likes: 100,
  //     },
  //   ],
  // });

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

  const renderButton = (userId: string) => {
    if (user?.id === userId) {
      return (
        <Button
          label="Update Profile"
          onPress={() => navigation.navigate("UpdateProfileScreen")}
        />
      );
    } else {
      return (
        <Button
          label="Follow"
          // onPress={() => navigation.navigate("UpdateProfileScreen")}
        />
      );
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={styles.container}>
      <Header title={"Profile"} />
      {!isLoading && (
        <>
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
                <Text style={styles.statsText}>{user?.followerCount}</Text>
                <Text style={styles.statsLabel}>Followers</Text>
              </View>
              <View style={styles.statsItem}>
                <Text style={styles.statsText}>{user?.followingCount}</Text>
                <Text style={styles.statsLabel}>Following</Text>
              </View>
              <View style={styles.statsItem}>
                <Text style={styles.statsText}>{user?.postData?.length}</Text>
                <Text style={styles.statsLabel}>Posts</Text>
              </View>
            </View>

            {renderButton(user?.id)}
            <Text style={styles.bio}>Bio: {user.bio}</Text>
          </View>

          <PostCard postData={user?.postData} />
        </>
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

export default ProfileScreen;
