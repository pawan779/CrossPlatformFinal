import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Header from "../../../components/common/Header";
import Button from "../../../components/common/Button";
import Typography from "../../../components/common/Typography";
import { Common } from "../../../components/common";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  profileImageUri: string | null;
  bio: string;
}

const UpdateProfile: React.FC = () => {
  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    email: "user@example.com",
    profileImageUri: "https://source.unsplash.com/random?user",
    bio: "",
  });

  const selectProfileImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setUser((prevUser) => ({
        ...prevUser,
        profileImageUri: result.assets[0].uri,
      }));
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Update Profile" />
      <View style={styles.content}>
        {user.profileImageUri && (
          <View style={styles.profileImageContainer}>
            <TouchableOpacity onPress={selectProfileImage}>
              <Image
                source={{ uri: user.profileImageUri }}
                style={styles.profileImage}
              />
            </TouchableOpacity>
          </View>
        )}
        <Typography style={styles.label}>First Name</Typography>
        <TextInput
          style={styles.input}
          placeholder="Enter first name"
          value={user.firstName}
          onChangeText={(text) => setUser({ ...user, firstName: text })}
        />

        <Typography style={styles.label}>Last Name</Typography>
        <TextInput
          style={styles.input}
          placeholder="Enter last name"
          value={user.lastName}
          onChangeText={(text) => setUser({ ...user, lastName: text })}
        />

        <Typography style={styles.label}>Email</Typography>
        <Text style={styles.emailText}>{user.email}</Text>

        <Typography style={styles.label}>Bio</Typography>
        <TextInput
          style={styles.bioInput}
          placeholder="Tell us about yourself..."
          value={user.bio}
          onChangeText={(text) => setUser({ ...user, bio: text })}
          multiline
        />
      </View>

      <Button
        label="Save Changes"
        onPress={() => {
          /* Implement save changes functionality */
        }}
      />
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
    color: Common.Colors.black,
    fontWeight: "bold",
  },
  emailText: {
    fontSize: 16,
    marginBottom: 20,
    color: Common.Colors.black,
  },
  input: {
    borderWidth: 1,
    borderColor: Common.Colors.text,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 20,
    color: Common.Colors.black,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 75,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: Common.Colors.primary,
  },

  selectImageButtonText: {
    color: Common.Colors.black,
    fontWeight: "bold",
  },
  bioInput: {
    borderWidth: 1,
    borderColor: Common.Colors.text,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 20,
    color: Common.Colors.black,
    height: 100,
    textAlignVertical: "top",
  },
  profileImageContainer: {
    alignItems: "center",
  },
});

export default UpdateProfile;
