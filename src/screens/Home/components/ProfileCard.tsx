import React, { useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import LongTextWithToggle from "../../../components/Text/LongTextWithToggle";

const ProfileCard: React.FC = () => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikePress = () => {
    setIsLiked(!isLiked);
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Image
            source={{ uri: "https://source.unsplash.com/random" }}
            style={styles.avatar}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome
            name={"heart"}
            size={30}
            color={isLiked ? "red" : "#fff"}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome
            name={"share-alt"}
            size={30}
            color={isLiked ? "red" : "#fff"}
          />
        </TouchableOpacity>
      </View>
      <LongTextWithToggle initialText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias fugiat similique esse quasi id voluptatem, ipsum animi, accusantium nesciunt exercitationem minus qui! Eum hic eveniet iure cumque corporis, deserunt doloremque." />
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
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
});

export default ProfileCard;
