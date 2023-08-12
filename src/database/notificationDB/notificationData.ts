import { app, db } from "../config";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { errorMessage } from "../../components/common/ErrorMessage";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";

export const addNotification = async (data: {
  senderId: string;
  receiverId: string;
  postId: string;
  type?: string;
  title: string;
  body: string;
  data?: any;
}): Promise<any> => {
  try {
    const {
      senderId,
      receiverId,
      postId,
      type,
      title,
      body,
      data: customData,
    } = data;

    const notificationsRef = collection(db, "notifications");

    const notificationData = {
      senderId,
      receiverId,
      postId,
      type,
      title,
      body,
      data: customData || null,
    };

    const newNotificationRef = await addDoc(notificationsRef, notificationData);

    return { success: true };
  } catch (error) {
    console.error("Error adding notification:", error);
    errorMessage(error);
    throw error;
  }
};

export const fetchNotifications = async (userId: string): Promise<any[]> => {
  try {
    const notificationsRef = collection(db, "notifications");
    const q = query(
      notificationsRef,
      where("receiverId", "==", userId),
      orderBy("__name__", "desc")
    );
    const querySnapshot = await getDocs(q);

    const notifications = [];
    querySnapshot.forEach((doc) => {
      notifications.push({ id: doc.id, ...doc.data() });
    });

    return notifications;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};
