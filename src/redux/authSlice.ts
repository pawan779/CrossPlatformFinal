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
      state.user = action.payload || initialState.user;
    },
    loginUserAction: (state, action) => {
      state.user = action.payload || initialState.user;
    },
    getUserAction: (state, action) => {
      state.user = action.payload || initialState.user;
    },
    updateUaserAction: (state, action) => {
      state.user = { ...state.user, ...action.payload } || initialState.user;
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
  updateUaserAction,
} = authSlice.actions;

export default authSlice.reducer;
