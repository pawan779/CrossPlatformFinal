import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

const rootReducer = combineReducers({
  blank: (state = null) => state,
  authSlice: authSlice,
});

export default rootReducer;
