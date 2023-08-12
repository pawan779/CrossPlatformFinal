// components/common/NotificationCard.tsx

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Common } from "../common";

interface NotificationCardProps {
  title: string;
  description: string;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  title,
  description,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Common.Colors.border,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 20,
    backgroundColor: Common.Colors.white,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: Common.Colors.black,
  },
  description: {
    marginTop: 5,
    color: Common.Colors.text,
  },
  date: {
    marginTop: 5,
    fontSize: 12,
    color: Common.Colors.text,
  },
});

export default NotificationCard;
