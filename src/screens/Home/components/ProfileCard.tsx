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

export interface CardDataProps {
  id: number;
  title: string;
  postImage?: string;
  userId: number;
  likeCount: number;
  isLikedbyMe: boolean;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    profileImage: string;
  };
}

interface ProfileCardProps {
  data: CardDataProps;
}

const ProfileCard: React.FC<ProfileCardProps> = (props) => {
  const userId = useSelector((state: any) => state?.authSlice?.user?.id);

  const dispatch = useDispatch();
  const handleLikePress = async (post, postId) => {
    try {
      const res = await updateLikePost(post, postId, userId);
      dispatch(likePostAction(res));
    } catch (error) {
      console.log(error);
    }
  };

  const navigation = useNavigation();

  const handleShare = (post: CardDataProps) => {
    Share.share({
      message: post?.title || "No title",
      url: post?.postImage,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate("ProfileScreen")}
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
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => handleShare(props?.data)}
        >
          <FontAwesome name={"share-alt"} size={30} color={"#fff"} />
        </TouchableOpacity>
      </View>
      <LongTextWithToggle initialText={props?.data?.title} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    position: "absolute",
    zIndex: 9,
    bottom: 10,
    right: 0,
    width: "100%",
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
