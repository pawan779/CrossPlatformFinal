import React, { useEffect } from "react";
import { View, Text } from "react-native";
import Header from "../../components/common/Header";
import ImageSlider from "./components/ImageSlider";
import CustomTabNavigation from "./components/TabBar";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../../database/postDB";
import { getPostAction } from "../../redux/postSlice";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state: any) => state?.postSlice?.post);

  const loadPost = async () => {
    const posts = await getPost();
    dispatch(getPostAction(posts));
    console.log(posts);
  };

  useEffect(() => {
    loadPost();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ImageSlider data={posts} />
    </View>
  );
};

export default Home;
