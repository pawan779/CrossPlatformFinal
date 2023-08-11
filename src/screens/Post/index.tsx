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

const AddPost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);

  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setImageUri(null);
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
            <Image source={{ uri: imageUri }} style={styles.image} />
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

      <Button label="Add Post" onPress={() => {}} />
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
