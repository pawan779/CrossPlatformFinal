import { app, db } from "../config";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
  getDocs,
  getDoc,
} from "firebase/firestore"; // Import 'collection' and 'addDoc'
import { Toast } from "react-native-toast-message/lib/src/Toast";
import uploadImageToCloudinary from "../cloudinary";
import { getUserById } from "../authDB";
import { errorMessage } from "../../components/common/ErrorMessage";

export const addPost = async (data: {
  title?: string;
  image?: string;
  userId: string;
}): Promise<any> => {
  try {
    const { title, image, userId } = data;
    let imageRef;
    if (image) {
      imageRef = await uploadImageToCloudinary(image);
    } else {
      imageRef = "";
    }

    const postsCollection = collection(db, "posts");
    const res = await addDoc(postsCollection, {
      title,
      postImage: imageRef,
      userId,
      likeCount: 0,
      likedBy: [],
    });

    Toast.show({
      type: "success",
      text1: "Success",
      text2: "Post added successfully",
    });
  } catch (error) {
    console.log("Error adding post:", error);
    errorMessage(error);
  }
};

export const getPost = async () => {
  const data = [];
  const dbCollection = collection(db, "posts");

  try {
    const querySnapshot = await getDocs(dbCollection);

    for (const doc of querySnapshot.docs) {
      const createdUser = await getUserById(doc.data()?.userId);

      const post = {
        ...doc.data(),
        id: doc.id,
        user: createdUser,
      };
      data.push(post);
    }
  } catch (error) {
    console.log("Error:", error);
    errorMessage(error);
  }

  return data;
};

export const getPostById = async (id: string) => {
  try {
    const usersCollection = doc(db, "posts", id);
    const docSnap = await getDoc(usersCollection);

    if (docSnap.exists()) {
      return { ...docSnap.data(), id: docSnap.id };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    errorMessage(error);
  }
};

export const getPostByUserId = async (userId) => {
  const userPosts = [];
  const dbCollection = collection(db, "posts");

  try {
    const querySnapshot = await getDocs(dbCollection);

    for (const doc of querySnapshot.docs) {
      const postData = doc.data();
      if (postData.userId === userId) {
        const post = {
          ...postData,
          id: doc.id,
        };
        userPosts.push(post);
      }
    }
  } catch (error) {
    errorMessage(error);
    console.log("Error:", error);
  }

  return userPosts;
};
