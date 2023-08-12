import { app, db } from "../config";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
} from "firebase/firestore"; // Import 'collection' and 'addDoc'
import { Toast } from "react-native-toast-message/lib/src/Toast";
import uploadImageToCloudinary from "../cloudinary";
import { getUserById } from "../authDB";
import { errorMessage } from "../../components/common/ErrorMessage";
import { CardDataProps } from "../../screens/Home/components/ProfileCard";

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
    throw error;
  }
};

export const getPost = async (userId: string) => {
  const data = [];
  const dbCollection = collection(db, "posts");

  try {
    const querySnapshot = await getDocs(dbCollection);

    for (const doc of querySnapshot.docs) {
      const createdUser = await getUserById(doc.data()?.userId);

      const post = {
        ...doc.data(),
        id: doc.id,
        isLikedbyMe: doc.data().likedBy.includes(userId),
        user: createdUser,
      };
      data.push(post);
    }
  } catch (error) {
    console.log("Error:", error);
    errorMessage(error);
    throw error;
  }

  return data;
};

export const getPostById = async (id: string, userId: string) => {
  try {
    const usersCollection = doc(db, "posts", id);
    const docSnap = await getDoc(usersCollection);

    if (docSnap.exists()) {
      return {
        ...docSnap.data(),
        isLikedbyMe: docSnap.data().likedBy.includes(userId),
        id: docSnap.id,
      };
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
      // const createdUser = await getUserById(userId);
      if (postData.userId === userId) {
        const post = {
          ...postData,
          isLikedbyMe: postData.likedBy.includes(userId),
          id: doc.id,
          // user: createdUser,
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

export const updateLikePost = async (
  userPost: any,
  postId: string,
  userId: string
) => {
  const postDocRef = doc(db, "posts", postId);

  try {
    const postDoc = await getDoc(postDocRef);
    if (postDoc.exists()) {
      const post = postDoc.data();

      // Check if the user has already liked the post
      if (post.likedBy.includes(userId) && post.likedBy.length > 0) {
        // User has already liked, so unlike the post
        await updateDoc(postDocRef, {
          likeCount: post.likeCount - 1,
          likedBy: arrayRemove(userId),
          isLikedbyMe: false,
        });
        return {
          ...userPost,
          id: postId,
          likeCount: post.likeCount - 1,
          likedBy: arrayRemove(userId),
          isLikedbyMe: false,
        };
      } else {
        // User has not liked, so like the post
        await updateDoc(postDocRef, {
          likeCount: post.likeCount + 1,
          likedBy: arrayUnion(userId),
          isLikedbyMe: true,
        });
        return {
          ...userPost,
          id: postId,
          likeCount: post.likeCount + 1,
          likedBy: arrayUnion(userId),
          isLikedbyMe: true,
        };
      }
    } else {
      console.log("Post not found");
    }
  } catch (error) {
    console.error("Error liking post:", error);
    errorMessage(error);
    throw error;
  }
};

export const updatePost = async (data: {
  title?: string;
  image?: string;
  profileImage?: string;
  postId: string;
}): Promise<any> => {
  const { title, image, profileImage, postId } = data;

  let imageRef;
  const postDocRef = doc(db, "posts", postId);

  try {
    if (image) {
      imageRef = await uploadImageToCloudinary(image);
    }
    const postDoc = await getDoc(postDocRef);
    if (!postDoc.exists()) {
      throw new Error("Post not found");
    }

    const updateObject: any = {
      title,
    };

    if (image) {
      updateObject.postImage = imageRef;
    } else {
      updateObject.postImage = profileImage;
    }

    await updateDoc(postDocRef, updateObject);

    console.log("postDoc.data(),", postDoc.data());
    return {
      ...postDoc.data(),
      title,
      postImage: updateObject.postImage,
      id: postId,
    };
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};

export const deletePost = async (postId: string): Promise<void> => {
  const postDocRef = doc(db, "posts", postId);

  try {
    await deleteDoc(postDocRef);
    console.log("Post deleted successfully");
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};
