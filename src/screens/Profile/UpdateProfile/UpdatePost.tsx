import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Header from "../../../components/common/Header";
import Button from "../../../components/common/Button";
import Typography from "../../../components/common/Typography";
import { Common } from "../../../components/common";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import * as postDb from "../../../database/postDB";
import { useDispatch, useSelector } from "react-redux";
import { getPostAction } from "../../../redux/postSlice";
import {
  deletePostAction,
  startLoadingAction,
  stopLoadingAction,
  updatePostAction,
} from "../../../redux/authSlice";

const UpdatePost: React.FC = (props: any) => {
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
    setImage(null);
  };

  const loadPost = async () => {
    const posts = await postDb.getPost(userId);
    dispatch(getPostAction(posts));
  };

  const handleUpdatePost = async () => {
    if (!title && !image) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Post title or image is missing",
      });
    } else {
      try {
        dispatch(startLoadingAction());
        const res = await postDb.updatePost({
          title,
          image: imageUri,
          profileImage: image,
          postId: props?.route.params?.postData?.id,
        });

        console.log("response", res);
        dispatch(updatePostAction(res));

        loadPost();
        dispatch(stopLoadingAction());
        props?.navigation?.goBack();
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Post updated successfully",
        });
      } catch (error) {
        console.log(error);
        dispatch(stopLoadingAction());
      }
    }
  };

  const handleDeletePost = async () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this post?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              const postId = props?.route.params?.postData?.id;
              dispatch(startLoadingAction());
              await postDb.deletePost(postId);
              dispatch(deletePostAction(postId));
              loadPost();
              dispatch(stopLoadingAction());
              props?.navigation?.goBack();
              Toast.show({
                type: "success",
                text1: "Success",
                text2: "Post deleted successfully",
              });
            } catch (error) {
              console.log(error);
              dispatch(stopLoadingAction());
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    setTitle(props?.route.params?.postData?.title);
    setImage(props?.route.params?.postData?.postImage);
  }, []);

  return (
    <View style={styles.container}>
      <Header title="Update Post" />
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
        {image && (
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

      <Button
        label="Delete Post"
        onPress={handleDeletePost}
        buttonColor={Common.Colors.error}
      />
      <Button label="Update" onPress={handleUpdatePost} />
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
    color: Common.Colors.black,
    fontWeight: "bold",
  },
  removeImageButton: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    borderColor: Common.Colors.error,
    borderWidth: 1,
  },
  removeImageButtonText: {
    color: Common.Colors.error,
    fontWeight: "bold",
  },
});

export default UpdatePost;
