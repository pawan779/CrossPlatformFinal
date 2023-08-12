import React from "react";
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Typography from "../../../components/common/Typography";
import { Common } from "../../../components/common";
import { useNavigation } from "@react-navigation/native";

interface Post {
  id: number;
  postImage: string;
  title: string;
}

interface PostCardProps {
  postData: Post[];
}

const PostCard: React.FC<PostCardProps> = ({ postData }) => {
  const navigation = useNavigation();

  const handlePost = (item) => {
    console.log("Post");
    navigation.navigate("UpdatPostScreen", { postData: item });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={postData}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => handlePost(item)}
          >
            {item?.postImage ? (
              <Image source={{ uri: item?.postImage }} style={styles.image} />
            ) : (
              <View style={styles.image}>
                <Typography
                  variant="body"
                  numberOfLine={2}
                  ellipsizeMode="tail"
                  style={{ fontSize: 12 }}
                >
                  {item.title}{" "}
                </Typography>
              </View>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
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
