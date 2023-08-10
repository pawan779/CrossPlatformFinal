import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import Typography from "../../../components/common/Typography";

const ProfileCard: React.FC = () => {
  return (
    <View
      style={{
        padding: 5,
        position: "absolute",
        zIndex: 9,
        top: 0,
        backgroundColor: "rgba(255,255,255,.6)",
        width: "100%",
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Image
          source={{ uri: "https://source.unsplash.com/random" }}
          style={{ width: 40, height: 40, borderRadius: 40 }}
        />
        {/* <View>
          <Typography
            variant="button"
            style={{ color: "#000", marginLeft: 10 }}
          >
            John Doe
          </Typography>
          <Typography style={{ color: "#000", marginLeft: 10 }}>
            10 hrs ago
          </Typography>
        </View> */}
      </View>
      <Text numberOfLines={2} ellipsizeMode="tail" style={{ paddingTop: 5 }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat,
        corporis! Facere est, accusantium nostrum magni quae eligendi cumque
        expedita aut quos earum minus eius! Quam ducimus sapiente modi nam
        ullam!
      </Text>
    </View>
  );
};

export default ProfileCard;
const styles = StyleSheet.create({});
