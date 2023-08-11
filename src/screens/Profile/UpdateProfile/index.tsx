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
import CommonTextInput from "../../../components/common/CustomInput";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  profileImageUri: string | null;
  bio: string;
  phone: string;
}
interface ErrorData {
  firstName: boolean;
  lastName: boolean;
  bio: boolean;
  phone: boolean;
}

const UpdateProfile: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "user@example.com",
    profileImageUri: "https://source.unsplash.com/random?user",
    bio: "",
    phone: "",
  });

  const [errorData, setErrorData] = useState<ErrorData>({
    firstName: false,
    lastName: false,
    bio: false,
    phone: false,
  });

  const selectProfileImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData((prevUser) => ({
        ...prevUser,
        profileImageUri: result.assets[0].uri,
      }));
    }
  };

  const handleChange = (key: keyof FormData, value: string) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
    setErrorData((prevErrorData) => ({ ...prevErrorData, [key]: false }));
  };

  return (
    <View style={styles.container}>
      <Header title="Update Profile" />
      <View style={styles.content}>
        {formData.profileImageUri && (
          <View style={styles.profileImageContainer}>
            <TouchableOpacity onPress={selectProfileImage}>
              <Image
                source={{ uri: formData.profileImageUri }}
                style={styles.profileImage}
              />
            </TouchableOpacity>
          </View>
        )}
        <Typography style={styles.label}>First Name</Typography>
        <CommonTextInput
          placeholder="First Name"
          value={formData.firstName}
          onChangeText={(text) => handleChange("firstName", text)}
          error={errorData.firstName}
        />

        <Typography style={styles.label}>Last Name</Typography>
        <CommonTextInput
          placeholder="Last Name"
          value={formData.lastName}
          onChangeText={(text) => handleChange("lastName", text)}
          error={errorData.lastName}
        />

        <Typography style={styles.label}>Phone Number</Typography>
        <CommonTextInput
          placeholder="Phone Number"
          value={formData.phone}
          onChangeText={(text) => handleChange("phone", text)}
          error={errorData.phone}
          keyboardType="phone-pad"
        />

        <Typography style={styles.label}>Email</Typography>
        <Text style={styles.emailText}>{formData.email}</Text>

        <Typography style={styles.label}>Bio</Typography>
        <TextInput
          style={styles.bioInput}
          placeholder="Tell us about yourself..."
          value={formData.bio}
          onChangeText={(text) => handleChange("bio", text)}
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
