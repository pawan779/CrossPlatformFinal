import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import Typography from "../../../components/common/Typography";
import { Common } from "../../../components/common";
import { useNavigation } from "@react-navigation/native";
import { CardDataProps } from "../../Home/components/ProfileCard";

interface Post {
  id: number;
  postImage: string;
  title: string;
}

interface PostCardProps {
  postData: Post[];
  user: CardDataProps;
  redirectFrom: string;
}

const PostCard: React.FC<PostCardProps> = ({
  postData,
  user,
  redirectFrom,
}) => {
  const navigation: any = useNavigation();

  const handlePost = (item: Post) => {
    redirectFrom == "ViewOtherProfile"
      ? navigation.navigate("OthersPostScreen", { postData: user })
      : navigation.navigate("UpdatPostScreen", { postData: item });
  };

  return (
    <View style={styles.container}>
      {postData?.map((item, index) => (
        <TouchableOpacity
          key={item.id}
          style={styles.touchable}
          onPress={() => handlePost(item)}
        >
          {item?.postImage ? (
            <Image source={{ uri: item?.postImage }} style={styles.image} />
          ) : (
            <View style={styles.image}>
              <Typography
                variant="body"
                numberOfLines={2}
                ellipsizeMode="tail"
                style={{ fontSize: 12 }}
              >
                {item.title}
              </Typography>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  touchable: {
    width: "33.3%",
    padding: 5,
  },
  image: {
    aspectRatio: 1,
    width: "100%",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Common.Colors.border,
  },
});

export default PostCard;
