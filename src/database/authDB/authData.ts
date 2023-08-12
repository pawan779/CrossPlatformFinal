import { app, db } from "../config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { getPostByUserId } from "../postDB";

export const registerUser = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  bio?: string;
  profileImage?: string;
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
      text2: error.message,
    });
    throw error;
  }
};

export const loginUser = async (data: {
  email: string;
  password: string;
}): Promise<any> => {
  try {
    const { email, password } = data;

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
    return user;
  } catch (error) {
    console.log("Registration error:", error);
    Toast.show({
      type: "error",
      text1: "Error",
      text2: error.message,
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
    throw error;
  }
};
