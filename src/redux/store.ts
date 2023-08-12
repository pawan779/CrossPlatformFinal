import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import logger from "redux-logger";
import rootReducer from "./roootReducer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["authSlice", "postSlice"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    })
  : compose;

const middleware = [];
const enhancers = [];

middleware.push(logger);
enhancers.push(applyMiddleware(...middleware));

const store = createStore(persistedReducer, composeEnhancers(...enhancers));
const persistor = persistStore(store);

export { store, persistor };
