import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import { loadingBarReducer } from "react-redux-loading-bar";
import {
  createStateSyncMiddleware,
  initMessageListener,
} from "redux-state-sync";
import userReducer from "./reducers/member";
// import { cart } from "./reducers/carts";

const authPersistConfig = { key: "auth", storage };
const userPersistConfig = { key: "userauth", storage };
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  userauth: persistReducer(userPersistConfig, userReducer),
  // loadingBar: loadingBarReducer,
});
const syncConfig = {
  //All action will be striggered in other tabs except BLACK LIST
  blacklist: ["persist/PERSIST"],
};
const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk, createStateSyncMiddleware(syncConfig)],
});
initMessageListener(store);

export default store;
export const persistor = persistStore(store);
