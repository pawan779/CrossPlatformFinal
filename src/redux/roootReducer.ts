import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import postSlice from "./postSlice";

const rootReducer = combineReducers({
  blank: (state = null) => state,
  authSlice: authSlice,
  postSlice: postSlice,
});

export default rootReducer;
