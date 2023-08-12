import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./postSlice";

const storeEnhancers: any[] = [];
if (process.env.NODE_ENV === "development" && !global.HermesInternal) {
  // Add Redux DevTools extension enhancer only in development mode and not in Hermes
  storeEnhancers.push(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}

export const store = configureStore({
  reducer: {
    post: postSlice,
  },
  enhancers: storeEnhancers, // Use the conditionally created enhancers array
  /* preloadedState, */
});
