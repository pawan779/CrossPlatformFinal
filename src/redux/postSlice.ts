import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: [
    {
      id: "",
      title: "",
      postImage: "",
      userId: "",
      likeCount: 0,
      likedBy: [],
    },
  ],
  othersPost: [
    {
      id: "",
      title: "",
      postImage: "",
      userId: "",
      likeCount: 0,
      likedBy: [],
    },
  ],
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getPostAction: (state, action) => {
      state.post = action.payload;
    },
    getOtherPostAction: (state, action) => {
      state.othersPost = action.payload;
    },
    likePostAction: (state, action) => {
      const newPost = [...state.post];
      const index = newPost.findIndex((post) => post.id === action.payload.id);
      newPost[index] = action.payload;

      const newOtherPost = [...state.othersPost];
      const otherIndex = newOtherPost.findIndex(
        (post) => post.id === action.payload.id
      );
      newOtherPost[otherIndex] = action.payload;

      state.post = newPost;
      state.othersPost = newOtherPost;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getPostAction, likePostAction, getOtherPostAction } =
  postSlice.actions;

export default postSlice.reducer;
