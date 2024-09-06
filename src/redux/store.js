// app/store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import flashcardSetReducer from "./flashcardSetSlide"

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

// Điều chỉnh cấu hình persist
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth'], // sử dụng whitelist thay vì whiteList và tên của slice
}

const rootReducer = combineReducers({
  auth: authReducer,
  flashcardSet: flashcardSetReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

let persistor = persistStore(store)

export { store, persistor }
