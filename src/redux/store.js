import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import filtersReducer from "./filters/slice";
import authReducer from "./auth/slice";
import recipesReducer from "./recipes/slice";

import recipesListenerMiddleware from "./recipes/middlewares";
import filtersListenerMiddleware from "./filters/middlewares";
import modalReducer from "./modal/slice.js";


const persistedAuthReducer = persistReducer(
  {
    key: "user-token",
    storage,
    whitelist: ["accessToken"],
  },
  authReducer
);

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    auth: persistedAuthReducer,
    recipes: recipesReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(recipesListenerMiddleware.middleware)
      .concat(filtersListenerMiddleware.middleware),
});

export default store;

export const persistor = persistStore(store);
