import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Header from "../../components/common/Header";
import Button from "../../components/common/Button";
import Typography from "../../components/common/Typography";
import { Common } from "../../components/common";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import * as postDb from "../../database/postDB";
import { useDispatch, useSelector } from "react-redux";
import { getPostAction } from "../../redux/postSlice";

const AddPost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [image, setImage] = useState(null);
  const userId = useSelector((state: any) => state?.authSlice?.user?.id);
  const dispatch = useDispatch();

  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].base64);
      setImage(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setImageUri(null);
  };

  const clearPost = () => {
    setTitle("");
    setImageUri(null);
    setImage(null);
  };

  const loadPost = async () => {
    const posts = await postDb.getPost();
    dispatch(getPostAction(posts));
    console.log(posts);
  };

  const handleAddPost = async () => {
    if (!title && !image) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Post title or image is missing",
      });
    } else {
      await postDb.addPost({ title, image: imageUri, userId });
      clearPost();
      loadPost();
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Add Post" />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Typography style={styles.label}>Title</Typography>
        <TextInput
          style={styles.input}
          placeholder="Enter post title"
          value={title}
          onChangeText={setTitle}
          multiline
        />

        <Typography style={styles.label}>Image</Typography>
        {imageUri && (
          <>
            <Image source={{ uri: image }} style={styles.image} />
            <TouchableOpacity
              style={styles.removeImageButton}
              onPress={removeImage}
            >
              <Typography style={styles.removeImageButtonText}>
                Remove Image
              </Typography>
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity
          style={styles.selectImageButton}
          onPress={selectImage}
        >
          <Typography style={styles.selectImageButtonText}>
            Select Image
          </Typography>
        </TouchableOpacity>
      </ScrollView>

      <Button label="Add Post" onPress={handleAddPost} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 20,
    color: "#333",
    height: 100,
    textAlignVertical: "top",
  },
  image: {
    width: "100%",
    height: 300,
    maxHeight: 300,
    borderRadius: 5,
    marginBottom: 20,
  },
  selectImageButton: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  selectImageButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
  removeImageButton: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: Common.Colors.error,
  },
  removeImageButtonText: {
    color: Common.Colors.white,
    fontWeight: "bold",
  },
});

export default AddPost;
