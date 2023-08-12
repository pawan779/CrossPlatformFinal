import React, { useEffect } from "react";
import { View, Text } from "react-native";
import Header from "../../../../components/common/Header";
import ImageSlider from "../../components/ImageSlider";
import CustomTabNavigation from "../../components/TabBar";
import { useDispatch, useSelector } from "react-redux";
import { getPost, getPostByUserId } from "../../../../database/postDB";
import { getOtherPostAction, getPostAction } from "../../../../redux/postSlice";
import {
  startLoadingAction,
  stopLoadingAction,
} from "../../../../redux/authSlice";
import Typography from "../../../../components/common/Typography";

const OthersPost: React.FC = (props: any) => {
  const dispatch = useDispatch();
  const posts = useSelector((state: any) => state?.postSlice?.othersPost);

  const user = props?.route?.params?.postData;

  console.log("users", user);

  const loadPost = async () => {
    try {
      dispatch(startLoadingAction());
      const posts = await getPostByUserId(user.id);
      posts.forEach((post: any) => {
        post.user = user;
      });
      dispatch(getOtherPostAction(posts));
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
      <Header title={"Profile"} />
      {posts?.length > 0 ? (
        <ImageSlider data={posts} />
      ) : (
        <Typography variant="body" style={{ textAlign: "center" }}>
          No Post Found
        </Typography>
      )}
    </View>
  );
};

export default OthersPost;
