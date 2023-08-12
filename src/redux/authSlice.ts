import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: { id: "" },
  isLoading: true,
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUserAction: (state, action) => {
      state.user = action.payload;
    },
    loginUserAction: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { registerUserAction, loginUserAction } = authSlice.actions;

export default authSlice.reducer;
