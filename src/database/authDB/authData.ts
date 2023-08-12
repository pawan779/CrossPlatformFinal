import { app, db } from "../config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { getPostByUserId } from "../postDB";
import { errorMessage } from "../../components/common/ErrorMessage";
import uploadImageToCloudinary from "../cloudinary";

export const registerUser = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  bio?: string;
  profileImage?: string;
  expoToken?: string;
}): Promise<any> => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      bio = "",
      profileImage = "",
      expoToken = "",
    } = data;

    const auth = getAuth(app);

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const db = getFirestore(app);
    const usersCollection = doc(db, "users", user.uid);
    const res = await setDoc(usersCollection, {
      firstName,
      lastName,
      email,
      phone,
      bio,
      expoToken,
      profileImage,
      followerCount: 0,
      followingCount: 0,
    });

    return {
      firstName,
      lastName,
      email,
      phone,
      bio,
      profileImage,
      id: user.uid,
    };
  } catch (error) {
    console.log("Registration error:", error);
    Toast.show({
      type: "error",
      text1: "Error",
      text2: error,
    });
    throw error;
  }
};

export const loginUser = async (data: {
  email: string;
  password: string;
  expoToken?: string;
}): Promise<any> => {
  try {
    const { email, password, expoToken } = data;

    const auth = getAuth(app);

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = {
      email: userCredential.user.email,
      id: userCredential.user.uid,
    };

    updateExpoToken({
      userId: userCredential.user.uid,
      expoToken,
    });

    return user;
  } catch (error) {
    console.log("Registration error:", error);

    Toast.show({
      type: "error",
      text1: "Error",
      text2: error,
    });
    throw error;
  }
};

export const checkISUserLoggedIn = async () => {
  const auth = getAuth();
  let isLoggedIn: Boolean;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is logged in
      console.log("User is logged in", user.uid);
      isLoggedIn = true;
    } else {
      // User is not logged in
      isLoggedIn = false;
      console.log("User is not logged in");
    }
  });
  return isLoggedIn;
};

export const getUserById = async (id: string) => {
  try {
    const usersCollection = doc(db, "users", id);
    const docSnap = await getDoc(usersCollection);

    if (docSnap.exists()) {
      const posts = await getPostByUserId(docSnap.id);
      return { ...docSnap.data(), id: docSnap.id, postData: posts };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    Toast.show({
      type: "error",
      text1: "Error",
      text2: error,
    });
  }
};

export const updateExpoToken = async (data: {
  userId?: string;
  expoToken?: string;
}): Promise<void> => {
  try {
    const { userId, expoToken = "" } = data;

    if (!userId) {
      throw new Error("User ID is required.");
    }

    const userDocRef = doc(db, "users", userId);

    const updateObject = {
      expoToken,
    };

    await updateDoc(userDocRef, updateObject);
  } catch (error) {
    console.error("Error updating user:", error);
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "Failed to update user",
    });

    throw error;
  }
};

export const updateUser = async (data: {
  firstName: string;
  lastName: string;
  phone: string;
  bio?: string;
  profileImage?: string;
  userId: string;
}): Promise<any> => {
  try {
    const { firstName, lastName, phone, bio, profileImage, userId } = data;

    let profileImageRef;
    if (profileImage) {
      profileImageRef = await uploadImageToCloudinary(profileImage);
    } else {
      profileImageRef = "";
    }

    const userDocRef = doc(db, "users", userId);

    const updateObject = {
      firstName,
      lastName,
      phone,
      bio,
    };

    if (profileImageRef) {
      updateObject.profileImage = profileImageRef;
    }

    await updateDoc(userDocRef, updateObject);

    Toast.show({
      type: "success",
      text1: "Success",
      text2: "User updated successfully",
    });

    const payload = {
      firstName,
      lastName,
      phone,
      bio,
      profileImage: profileImageRef,
    };
    return payload;
  } catch (error) {
    console.error("Error updating user:", error);
    Toast.show({
      type: "error",
      text1: "Error",
      text2: error,
    });
    throw error;
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    const auth = getAuth();
    await signOut(auth);
    Toast.show({
      type: "success",
      text1: "Success",
      text2: "Logged out successfully",
    });
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};
