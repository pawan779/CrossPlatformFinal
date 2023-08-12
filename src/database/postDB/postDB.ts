import { app, db } from "../config";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
} from "firebase/firestore"; // Import 'collection' and 'addDoc'
import { Toast } from "react-native-toast-message/lib/src/Toast";
import uploadImageToCloudinary from "../cloudinary";

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
    Toast.show({
      type: "error",
      text1: "Error",
      text2: error.message,
    });
    throw error;
  }
};
