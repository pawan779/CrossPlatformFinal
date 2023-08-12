import { app, db } from "../config";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

export const registerUser = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  bio?: string;
  profileImage?: string;
}): Promise<void> => {
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
    await setDoc(usersCollection, {
      firstName,
      lastName,
      email,
      phone,
      bio,
      profileImage,
    });

    console.log("User registered:", user);
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};
