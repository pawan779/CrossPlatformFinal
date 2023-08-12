import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: { id: "", postData: [] },
  otherUser: { id: "", postData: [] },
  isLoading: true,
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUserAction: (state, action) => {
      state.user = action.payload || initialState.user;
    },
    loginUserAction: (state, action) => {
      state.user = action.payload || initialState.user;
    },
    getUserAction: (state, action) => {
      state.user = action.payload || initialState.user;
    },
    getOtherUserAction: (state, action) => {
      state.otherUser = action.payload || initialState.otherUser;
    },
    updateUserAction: (state, action) => {
      state.user = { ...state.user, ...action.payload } || initialState.user;
    },
    updatePostAction: (state, action) => {
      const newPostData = [...state.user.postData];
      const index = newPostData.findIndex(
        (post) => post.id === action.payload.id
      );

      console.log("action.payload", action.payload);
      newPostData[index] = action.payload;

      state.user = {
        ...state.user,
        postData: newPostData,
      };
    },

    deletePostAction: (state, action) => {
      const newPostData = [...state.user.postData];
      const index = newPostData.findIndex((post) => post.id === action.payload);
      newPostData.splice(index, 1);

      state.user = {
        ...state.user,
        postData: newPostData,
      };
    },

    startLoadingAction: (state) => {
      state.isLoading = true;
    },
    stopLoadingAction: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  registerUserAction,
  loginUserAction,
  getUserAction,
  startLoadingAction,
  stopLoadingAction,
  updateUserAction,
  updatePostAction,
  getOtherUserAction,
  deletePostAction,
} = authSlice.actions;

export default authSlice.reducer;
