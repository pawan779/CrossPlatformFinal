import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import postSlice from "./postSlice";

const rootReducer = combineReducers(
  {
    blank: (state = null) => state,
    authSlice: authSlice,
    postSlice: postSlice,
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default rootReducer;
