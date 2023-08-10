import React from "react";
import { View, Image, StyleSheet, FlatList } from "react-native";

interface Post {
  id: number;
  image: string;
  caption: string;
  likes: number;
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
        renderItem={({ item }) => (
          <Image source={{ uri: item.image }} style={styles.image} />
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
    width: "33.33%",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
  },
});

export default PostCard;
