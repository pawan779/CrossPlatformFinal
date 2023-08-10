import React, { useState } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import Typography from "../../../components/common/Typography";
import Constant from "expo-constants";
import { Common } from "../../../components/common";

const CustomTabNavigation: React.FC = () => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: "70%",
        }}
      >
        <TouchableOpacity
          style={!isFollowing ? styles.selectedContainer : {}}
          onPress={() => setIsFollowing(false)}
        >
          <Typography
            variant="subheading"
            style={{
              color: !isFollowing ? Common.Colors.white : Common.Colors.text,
            }}
          >
            Discover
          </Typography>
        </TouchableOpacity>

        <TouchableOpacity
          style={isFollowing ? styles.selectedContainer : {}}
          onPress={() => setIsFollowing(true)}
        >
          <Typography
            variant="subheading"
            style={{
              color: isFollowing ? Common.Colors.white : Common.Colors.text,
            }}
          >
            Following
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomTabNavigation;

const styles = StyleSheet.create({
  selectedContainer: {
    borderBottomWidth: 1,
    borderColor: Common.Colors.white,
    paddingBottom: 2,
  },
  container: {
    top: Constant.statusBarHeight + 5,
    position: "absolute",
    zIndex: 999,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
