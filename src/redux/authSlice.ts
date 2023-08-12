import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
  isLoading: true,
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUserAction: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { registerUserAction } = authSlice.actions;

export default authSlice.reducer;
