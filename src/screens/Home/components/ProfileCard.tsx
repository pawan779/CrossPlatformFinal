import React, { useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import LongTextWithToggle from "../../../components/Text/LongTextWithToggle";
import Typography from "../../../components/common/Typography";
import { Common } from "../../../components/common";
import { useNavigation } from "@react-navigation/native";
import { FormData } from "../../Auth/Register";

interface CardData extends FormData {
  id: number;
  title: string;
  postImage?: string;
  userId: number;
  likeCount: number;
  user: FormData;
}

interface ProfileCardProps {
  data: CardData;
}

const ProfileCard: React.FC<ProfileCardProps> = (props) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikePress = () => {
    setIsLiked(!isLiked);
  };

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate("ProfileScreen")}
        >
          <Image
            source={{ uri: props?.data?.user?.image }}
            style={styles.avatar}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome
            name={"heart"}
            size={30}
            color={isLiked ? "red" : "#fff"}
          />
          <Typography
            variant="subheading"
            style={{ color: Common.Colors.white, marginTop: 10 }}
          >
            {props?.data?.likeCount}
          </Typography>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome
            name={"share-alt"}
            size={30}
            color={isLiked ? "red" : "#fff"}
          />
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
  },
});

export default ProfileCard;
