// screens/NotificationList.tsx

import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Common } from "../../components/common";
import NotificationCard from "../../components/card/NotificationCard";
import Header from "../../components/common/Header";
import { useDispatch, useSelector } from "react-redux";
import { startLoadingAction, stopLoadingAction } from "../../redux/authSlice";
import { fetchNotifications } from "../../database/notificationDB/notificationData";
import Typography from "../../components/common/Typography";
import { RefreshControl } from "react-native-gesture-handler";

interface NotificationProps {
  senderId: string;
  receiverId: string;
  postId: string;
  type: string;
  title: string;
  body: string;
  data: any;
}

const Notification: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const userId = useSelector((state: any) => state?.authSlice?.user?.id);
  const dispatch = useDispatch();

  const getNotifications = async () => {
    dispatch(startLoadingAction());
    const res = await fetchNotifications(userId);
    setNotifications(res);
    dispatch(stopLoadingAction());
  };

  const onRefresh = () => {
    getNotifications();
  };

  useEffect(() => {
    onRefresh();
  }, []);
  return (
    <View style={styles.container}>
      <Header title="Notification" />
      <View style={styles.container1}>
        <FlatList
          data={notifications}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={{ alignItems: "center", marginTop: 20 }}>
              <Typography variant="body">No Notifications</Typography>
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => (
            <NotificationCard title={item.title} description={item.body} />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Common.Colors.background,
  },

  container1: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flex: 1,
  },
});

export default Notification;
