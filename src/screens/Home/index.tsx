import React from "react";
import { View, Text } from "react-native";
import Header from "../../components/common/Header";
import ImageSlider from "./components/ImageSlider";
import CustomTabNavigation from "./components/TabBar";

const Home: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* <Header /> */}
      {/* <Text style={{ color: "#000" }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto,
        culpa praesentium molestias impedit odio voluptate rem consequatur eaque
        sequi. Numquam sapiente id ipsam iusto cumque in odio sed saepe quas!
      </Text> */}

      <ImageSlider />
    </View>
  );
};

export default Home;
