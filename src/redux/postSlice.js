import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: [],
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
    addPostAction: (state, action) => {
      state.post = [action.payload, ...state.post];
    },
    deletePostAction: (state, action) => {
      const updatetTask = state.post.filter(
        (task) => task.id != action.payload
      );
      state.post = updatetTask;
    },
    updatePostAction: (state, action) => {
      let newArray = [...state.post];
      const index = newArray.findIndex((i) => i.id === action.payload.id);
      if (index > -1) {
        newArray[index] = action.payload;
        state.post = newArray;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getPostAction,
  addPostAction,
  deletePostAction,
  updatePostAction,
} = postSlice.actions;

export default postSlice.reducer;
