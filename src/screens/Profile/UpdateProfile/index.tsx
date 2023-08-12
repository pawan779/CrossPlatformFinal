import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Header from "../../../components/common/Header";
import Button from "../../../components/common/Button";
import Typography from "../../../components/common/Typography";
import { Common } from "../../../components/common";
import CommonTextInput from "../../../components/common/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../database/authDB";
import {
  getUserAction,
  startLoadingAction,
  stopLoadingAction,
  updateUserAction,
} from "../../../redux/authSlice";
import { getPostAction } from "../../../redux/postSlice";
import * as postDb from "../../../database/postDB";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string | null;
  bio: string;
  phone: string;
}
interface ErrorData {
  firstName: boolean;
  lastName: boolean;
  phone: boolean;
}

const UpdateProfile: React.FC = (props: any) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "user@example.com",
    profileImage: "",
    bio: "",
    phone: "",
  });

  const [base64Image, setBase64Image] = useState<string>("");

  const [errorData, setErrorData] = useState<ErrorData>({
    firstName: false,
    lastName: false,
    phone: false,
  });
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const dispatch = useDispatch();

  const selectProfileImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      setFormData((prevUser) => ({
        ...prevUser,
        profileImage: result.assets[0].uri,
      }));
      setBase64Image(result.assets[0].base64);
    }
  };

  const handleChange = (key: keyof FormData, value: string) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
    setErrorData((prevErrorData) => ({ ...prevErrorData, [key]: false }));
  };

  const { user } = useSelector((state: any) => state?.authSlice);

  const checkValidation = () => {
    const newErrorData = {} as ErrorData;
    for (const key in formData) {
      if (formData[key] === "") {
        newErrorData[key] = true;
      }
    }

    // Validate Phone Number
    if (formData.phone.length !== 10) {
      newErrorData.phone = true;
    }

    setErrorData(newErrorData);
    if (Object.keys(newErrorData).length === 0) {
      setIsSubmit(true);
    }
  };

  const loadPost = async () => {
    const posts = await postDb.getPost(user.id);
    dispatch(getPostAction(posts));
    props.navigation.navigate("Dashboard");
  };

  const handleUpdateProfile = async () => {
    try {
      dispatch(startLoadingAction());
      const res = await updateUser({
        ...formData,
        profileImage: base64Image,
        userId: user?.id,
      });

      dispatch(updateUserAction(res));
      await loadPost();
      dispatch(stopLoadingAction());
    } catch (error) {
      console.log("error123", error);
      dispatch(stopLoadingAction());
    }
  };

  useEffect(() => {
    if (isSubmit) {
      handleUpdateProfile();
      setIsSubmit(false);
    }
  }, [isSubmit]);

  useEffect(() => {
    if (user) {
      setFormData({
        ...formData,
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        profileImage: user?.profileImage,
        bio: user?.bio,
        phone: user?.phone,
      });
    }
  }, []);

  return (
    <View style={styles.container}>
      <Header title="Update Profile" />
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.profileImageContainer}>
          <TouchableOpacity onPress={selectProfileImage}>
            <Image
              source={{ uri: formData?.profileImage }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

        <Typography style={styles.label}>First Name</Typography>
        <CommonTextInput
          placeholder="First Name"
          value={formData?.firstName}
          onChangeText={(text) => handleChange("firstName", text)}
          error={errorData.firstName}
          errorMessage="First name is required"
        />

        <Typography style={styles.label}>Last Name</Typography>
        <CommonTextInput
          placeholder="Last Name"
          value={formData.lastName}
          onChangeText={(text) => handleChange("lastName", text)}
          error={errorData?.lastName}
          errorMessage="Last name is required"
        />

        <Typography style={styles.label}>Phone Number</Typography>
        <CommonTextInput
          placeholder="Phone Number"
          value={formData.phone}
          onChangeText={(text) => handleChange("phone", text)}
          error={errorData?.phone}
          keyboardType="phone-pad"
          errorMessage="Phone number is required"
        />

        <Typography style={styles.label}>Email</Typography>
        <Text style={styles.emailText}>{formData?.email}</Text>

        <Typography style={styles.label}>Bio</Typography>
        <TextInput
          style={styles.bioInput}
          placeholder="Tell us about yourself..."
          value={formData?.bio}
          onChangeText={(text) => handleChange("bio", text)}
          multiline
        />
      </ScrollView>

      <Button label="Save Changes" onPress={checkValidation} />
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
