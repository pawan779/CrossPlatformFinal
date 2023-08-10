import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../common/Colors";

interface LongTextWithToggleProps {
  initialText: string;
}

const LongTextWithToggle: React.FC<LongTextWithToggleProps> = ({
  initialText,
}) => {
  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  return (
    <View style={styles.container}>
      <Text
        numberOfLines={showFullText ? undefined : 2}
        style={{ color: "#cecece" }}
        ellipsizeMode="middle"
      >
        {initialText}
      </Text>
      <TouchableOpacity onPress={toggleText}>
        <Text style={styles.toggleButton}>
          {showFullText ? "...less" : "...more"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  toggleButton: {
    color: "#cecece",
    marginTop: 5,
  },
});

export default LongTextWithToggle;
