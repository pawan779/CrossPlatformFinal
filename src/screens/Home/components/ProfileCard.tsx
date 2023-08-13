import React, { useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet, Share } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import LongTextWithToggle from "../../../components/Text/LongTextWithToggle";
import Typography from "../../../components/common/Typography";
import { Common } from "../../../components/common";
import { useNavigation } from "@react-navigation/native";
import { FormData } from "../../Auth/Register";
import { updateLikePost } from "../../../database/postDB";
import { useDispatch, useSelector } from "react-redux";
import { likePostAction } from "../../../redux/postSlice";
import { sendPushNotification } from "../../Notification/config";
import { addNotification } from "../../../database/notificationDB/notificationData";
import { SafeAreaView } from "react-native-safe-area-context";

export interface CardDataProps {
  id: number;
  title: string;
  postImage?: string;
  userId: string;
  likeCount: number;
  isLikedbyMe: boolean;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    profileImage: string;
    expoToken?: string;
  };
}

interface ProfileCardProps {
  data: CardDataProps;
  swipeLeft: () => void;
  onRefresh: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = (props) => {
  const userId = useSelector((state: any) => state?.authSlice?.user?.id);

  const dispatch = useDispatch();

  const handleLikePress = async (post, postId) => {
    const likeMessage = {
      title: "New Like",
      body: `${props?.data?.user?.firstName} ${props?.data?.user?.lastName} liked your post`,
      data: post,
    };

    try {
      const res = await updateLikePost(post, postId, userId);
      dispatch(likePostAction(res));
      {
        !post.isLikedbyMe &&
          (await sendPushNotification(
            props?.data?.user?.expoToken,
            likeMessage.title,
            likeMessage.body,
            likeMessage.data
          ));

        await addNotification({
          title: likeMessage.title,
          body: likeMessage.body,
          data: likeMessage.data,
          senderId: userId,
          receiverId: props?.data?.userId,
          type: "like",
          postId: postId,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const navigation: any = useNavigation();

  const handleShare = (post: CardDataProps) => {
    Share.share({
      message: post?.postImage,
      title: post?.title,
      url: post?.postImage,
    });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() =>
              userId === props?.data?.userId
                ? navigation.navigate("ProfileScreen")
                : navigation.navigate("ViewOthersProfileScreen", {
                    user: props?.data?.user,
                  })
            }
          >
            <Image
              source={{ uri: props?.data?.user?.profileImage }}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => handleLikePress(props?.data, props?.data?.id)}
          >
            <FontAwesome
              name={"heart"}
              size={30}
              color={
                props?.data?.isLikedbyMe
                  ? Common.Colors.error
                  : Common.Colors.white
              }
            />
            <Typography
              variant="subheading"
              style={{ color: Common.Colors.white, marginTop: 10 }}
            >
              {props?.data?.likeCount}
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={props.swipeLeft}>
            <FontAwesome name={"arrow-left"} size={30} color={"#fff"} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => handleShare(props?.data)}
          >
            <FontAwesome name={"share-alt"} size={30} color={"#fff"} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={props.onRefresh}>
            <FontAwesome name={"refresh"} size={30} color={"#fff"} />
          </TouchableOpacity>
        </View>
        <LongTextWithToggle initialText={props?.data?.title} />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    position: "absolute",
    zIndex: 9,
    bottom: 0,
    right: 0,
    left: 20,
    // width: "100%",
    flex: 1,
  },
  iconContainer: {
    alignItems: "flex-end",
  },
  iconButton: {
    padding: 15,
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: Common.Colors.white,
  },
});

export default ProfileCard;
