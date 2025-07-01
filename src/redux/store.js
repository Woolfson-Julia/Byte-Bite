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
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import filtersReducer from './filters/slice';
import authReducer from './auth/slice'
import  recipesReducer  from './recipes/slice'; 

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
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;

export const persistor = persistStore(store);
