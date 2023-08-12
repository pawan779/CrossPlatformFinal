import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./config";

// add data to firestore
export const addPost = async (description, done) => {
  let result = {};
  const dbCollection = collection(db, "posts");
  try {
    const res = await addDoc(dbCollection, {
      description,
      done,
    });

    const docSnapshot = await getDoc(res);
    if (docSnapshot.exists()) {
      result = {
        ...docSnapshot.data(),
        id: docSnapshot.id,
      };
    } else {
      console.log("Document does not exist");
    }
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
  console.log("result", result);
  return result;
};

// get data from firestore
export const load = async () => {
  // console.warn("loading...");
  let data = [];
  const dbCollection = collection(db, "posts");
  try {
    const querySnapshot = await getDocs(dbCollection);
    querySnapshot.forEach((doc) => {
      const post = {
        ...doc.data(),
        id: doc.id,
      };
      data.push(post);
    });
  } catch (error) {
    console.log("Error:", error);
  }

  return data;
};

// update data in firestore

export const updatePost = async (payload) => {
  // console.warn("loading...");
  let result = {};
  const dbDoc = doc(db, "posts", payload.id);
  try {
    const res = await updateDoc(dbDoc, {
      ...payload,
    });
    result = payload;
  } catch (error) {
    console.log("Error:", error);
    result = {
      ...payload,
      done: !payload.done,
    };
  }

  return result;
};

// remove data from firestore
export const deletePost = async (id) => {
  let result = {};
  const dbDoc = doc(db, "posts", id);
  try {
    const res = await deleteDoc(dbDoc);
    result = id;
  } catch (error) {
    console.log("Error:", error);
  }
  console.log("result", result);
  return result;
};
