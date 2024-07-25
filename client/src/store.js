import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/users/authSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import themeReducer from "./features/Dashboard/themeSlice";
import blogReducer from "./features/blogs/blogSlice";
import homeReducer from "./features/Home/homeSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
  blog: blogReducer,
  home: homeReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  blacklist: ["blog", "home"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
