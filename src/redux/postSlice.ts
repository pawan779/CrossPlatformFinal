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
  isLoading: true,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getPostAction: (state, action) => {
      state.post = action.payload;
      state.isLoading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getPostAction } = postSlice.actions;

export default postSlice.reducer;
