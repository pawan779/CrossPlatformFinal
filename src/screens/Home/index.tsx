import React, { useEffect } from "react";
import { View, Text } from "react-native";
import Header from "../../components/common/Header";
import ImageSlider from "./components/ImageSlider";
import CustomTabNavigation from "./components/TabBar";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../../database/postDB";
import { getPostAction } from "../../redux/postSlice";
import { startLoadingAction, stopLoadingAction } from "../../redux/authSlice";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state: any) => state?.postSlice?.post);
  const id = useSelector((state: any) => state?.authSlice?.user?.id);

  const loadPost = async () => {
    try {
      dispatch(startLoadingAction());
      const posts = await getPost(id);
      dispatch(getPostAction(posts));
      dispatch(stopLoadingAction());
    } catch (error) {
      console.log(error);
      dispatch(stopLoadingAction());
    }
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
