import React, { useEffect } from "react";
import { View, Text } from "react-native";
import Header from "../../components/common/Header";
import ImageSlider from "./components/ImageSlider";
import CustomTabNavigation from "./components/TabBar";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../../database/postDB";
import { getPostAction } from "../../redux/postSlice";
import { startLoadingAction, stopLoadingAction } from "../../redux/authSlice";
import Typography from "../../components/common/Typography";

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

  const onRefresh = () => {
    loadPost();
  };

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {posts.length > 0 ? (
        <ImageSlider data={posts} onRefresh={onRefresh} />
      ) : (
        <Typography variant="subheading" style={{ textAlign: "center" }}>
          No Post Found
        </Typography>
      )}
    </View>
  );
};

export default Home;
