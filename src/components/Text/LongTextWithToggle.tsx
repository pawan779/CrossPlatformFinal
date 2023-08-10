import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface LongTextWithToggleProps {
  initialText: string;
  maxLines?: number;
}

const LongTextWithToggle: React.FC<LongTextWithToggleProps> = ({
  initialText,
  maxLines = 2,
}) => {
  const [showFullText, setShowFullText] = useState(false);
  const [isTextOverflowing, setIsTextOverflowing] = useState(false);
  const textRef = useRef<View>(null);

  useEffect(() => {
    if (textRef.current) {
      textRef.current.measure((x, y, width, height) => {
        const lineHeight = Math.ceil(height / maxLines);
        setIsTextOverflowing(lineHeight < 18); // You can adjust the lineHeight threshold as needed
      });
    }
  }, []);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  return (
    <View style={styles.container}>
      <View ref={textRef}>
        <Text
          numberOfLines={showFullText ? undefined : maxLines}
          style={{ color: "#cecece" }}
          ellipsizeMode="middle"
        >
          {initialText}
        </Text>
      </View>
      {isTextOverflowing && (
        <TouchableOpacity onPress={toggleText}>
          <Text style={styles.toggleButton}>
            {showFullText ? "...less" : "...more"}
          </Text>
        </TouchableOpacity>
      )}
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
