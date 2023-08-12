import React from "react";
import { View, Image, StyleSheet, FlatList } from "react-native";
import Typography from "../../../components/common/Typography";

interface Post {
  id: number;
  postImage: string;
  title: string;
}

interface PostCardProps {
  postData: Post[];
}

const PostCard: React.FC<PostCardProps> = ({ postData }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={postData}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        renderItem={({ item }) =>
          item?.postImage ? (
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
          )
        }
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
    width: "33.33%",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PostCard;
