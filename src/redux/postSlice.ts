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
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getPostAction: (state, action) => {
      state.post = action.payload;
    },
    likePostAction: (state, action) => {
      const newPost = [...state.post];
      const index = newPost.findIndex((post) => post.id === action.payload.id);
      newPost[index] = action.payload;

      state.post = newPost;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getPostAction, likePostAction } = postSlice.actions;

export default postSlice.reducer;
