// screens/NotificationList.tsx

import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Common } from "../../components/common";
import NotificationCard from "../../components/card/NotificationCard";
import Header from "../../components/common/Header";

const notifications = [
  {
    id: "1",
    title: "New Message",
    description: "You have received a new message from a friend.",
    date: "2023-08-10",
  },
  {
    id: "2",
    title: "Event Reminder",
    description: "Don't forget about the upcoming event tomorrow!",
    date: "2023-08-11",
  },
];

const Notification: React.FC = () => {
  return (
    <View style={styles.container}>
      <Header title="Notification" />
      <View style={styles.container1}>
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <NotificationCard
              title={item.title}
              description={item.description}
              date={item.date}
            />
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
